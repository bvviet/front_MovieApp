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
import MovieInformation from "@components/MediaDetail/MovieInformation";

const DetailMovie = () => {
  const { user } = useUser();
  let { movieId } = useParams();
  const { fetchFavorite } = useContext(FavoriteContext);
  const { setMessages } = useContext(MessagesContext);
  const { setIsLoading } = useContext(LoadingContext);

  // Get detail
  const { data: movieDetail, isLoading } = useFetch({
    url: `/movie/${movieId}?append_to_response=release_dates,credits,videos`,
  });
  console.log(movieDetail);

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
          movieId: movieId,
          poster_path: movieDetail?.poster_path,
          title: movieDetail?.title || movieDetail?.name,
          release_date:
            movieDetail?.release_date || movieDetail?.first_air_date,
          vote_average: movieDetail?.vote_average,
          media_type: "movie",
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
      url: `/movie/${movieId}/recommendations?language=vi`,
    });

  const relatedMovies = recommendationResponse?.results || [];

  const certification = (
    (movieDetail?.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieDetail?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({
      id: crew.id,
      job: crew.job,
      name: crew.name,
    }));

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ToastContainer />
      <LoadingComponent />
      <Banner
        id={movieDetail?.id}
        title={movieDetail?.title}
        backdropPath={movieDetail?.backdrop_path}
        posterPath={movieDetail?.poster_path}
        voteAverage={movieDetail?.vote_average}
        releaseDate={movieDetail?.release_date}
        genres={movieDetail?.genres}
        certification={certification}
        crews={crews}
        overview={movieDetail?.overview}
        handleAddFavorite={handleAddFavorite}
        trailerVideoKey={
          (movieDetail?.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            <ActorList actors={movieDetail?.credits?.cast || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isLoadingRelated}
              title="More like this"
            />
          </div>
          <div className="flex-1">
            <MovieInformation
              movieInfo={movieDetail}
              originalTitle={movieDetail?.original_title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailMovie;
