import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

import { MessagesContext } from "@contexts/MessagesContext";
import { LoadingContext } from "@contexts/LoadingContext";
import LoadingComponent from "@components/Loading/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import { FavoriteContext } from "@contexts/FavoriteContext";
import TvShowInformation from "@components/MediaDetail/TvShowInformation";
import SeaSonsList from "@components/MediaDetail/SeaSonsList";

const TVShowDetail = () => {
  const { user } = useUser();
  let { tvShowId } = useParams();
  const { fetchFavorite } = useContext(FavoriteContext);
  const { setMessages } = useContext(MessagesContext);
  const { setIsLoading } = useContext(LoadingContext);

  // Get detail
  const { data: TVShowDetail, isLoading } = useFetch({
    url: `/tv/${tvShowId}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  setIsLoading(isLoading);

  //   Them vao yeu thich
  const handleAddFavorite = async () => {
    let errorMessage = "";
    if (!user) {
      errorMessage = "Bạn cần đăng nhập để lưu phim này vào yêu thích.";
      setMessages(errorMessage);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://back-end-movie-app-bvv.vercel.app/movies",
        {
          userId: user.id,
          movieId: tvShowId,
          poster_path: TVShowDetail?.poster_path,
          title: TVShowDetail?.title || TVShowDetail?.name,
          release_date:
            TVShowDetail?.release_date || TVShowDetail?.first_air_date,
          vote_average: TVShowDetail?.vote_average,
          media_type: "tv",
        },
      );
      if (res.status === 200) {
        fetchFavorite();
        toast.success("Thêm thành công!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      if (!error.response) {
        errorMessage = "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.";
      } else if (error.response.status === 404) {
        errorMessage = "API hiện tại đang bị lỗi :((";
      } else if (error.response.data.message || error.response.data.errors) {
        errorMessage =
          error.response.data.message || error.response.data.errors[0];
      } else {
        errorMessage = "Đã xảy ra lỗi vui lòng thử lại";
      }
      setMessages(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy danh sách bộ phim liên quan
  const { data: recommendationResponse, isLoading: isLoadingRelated } =
    useFetch({
      url: `/tv/${tvShowId}/recommendations?language=vi`,
    });

  const relatedTvShow = recommendationResponse?.results || [];

  const certification = (TVShowDetail?.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  const crews = (TVShowDetail?.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .map((crew) => ({
      id: crew.id,
      job: crew.jobs[0].job,
      name: crew.name,
    }))
    .slice(0, 10);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ToastContainer />
      <LoadingComponent />
      <Banner
        id={TVShowDetail?.id}
        title={TVShowDetail?.name}
        backdropPath={TVShowDetail?.backdrop_path}
        posterPath={TVShowDetail?.poster_path}
        voteAverage={TVShowDetail?.vote_average}
        releaseDate={TVShowDetail?.first_air_date}
        genres={TVShowDetail?.genres}
        certification={certification}
        crews={crews}
        overview={TVShowDetail?.overview}
        handleAddFavorite={handleAddFavorite}
        trailerVideoKey={
          (TVShowDetail?.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            <ActorList
              actors={(TVShowDetail?.aggregate_credits?.cast || []).map(
                (cats) => ({
                  ...cats,
                  character: cats.roles[0]?.character,
                  episodeCount: cats.roles[0]?.episode_count,
                }),
              )}
            />
            <SeaSonsList
              seasons={(TVShowDetail?.seasons || []).reverse()}
              seriesId={TVShowDetail?.id}
            />
            <RelatedMediaList
              mediaList={relatedTvShow}
              isLoading={isLoadingRelated}
              title="More like this"
            />
          </div>
          <div className="flex-1">
            <TvShowInformation
              tvShowInfo={TVShowDetail}
              originalTitle={TVShowDetail?.original_title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;
