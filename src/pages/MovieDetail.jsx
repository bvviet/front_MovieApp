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
import Information from "@components/MediaDetail/Information";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import { FavoriteContext } from "@contexts/FavoriteContext";

const DetailMovie = () => {
  const { user } = useUser();
  let { movieId } = useParams();
  let { mediaType } = useParams();
  const { fetchFavorite } = useContext(FavoriteContext);
  const { setMessages } = useContext(MessagesContext);
  const { setIsLoading } = useContext(LoadingContext);

  const urlMovie = `/movie/${movieId}?language=vi&append_to_response=release_dates,credits`;
  const urlTv = `/tv/${movieId}?language=vi&append_to_response=release_dates,credits`;

  // Get detail
  const { data: movieDetail, isLoading } = useFetch({
    url: mediaType == "tv" ? urlTv : urlMovie,
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
      const res = await axios.post("http://localhost:3000/movies", {
        userId: user.id,
        movieId: movieId,
        poster_path: movieDetail?.poster_path,
        title: movieDetail?.title || movieDetail?.name,
        release_date: movieDetail?.release_date || movieDetail?.first_air_date,
        vote_average: movieDetail?.vote_average,
        media_type: mediaType,
      });
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
      url:
        mediaType == "tv"
          ? `/tv/${movieId}/recommendations?language=vi`
          : `/movie/${movieId}/recommendations?language=vi`,
    });

  const relatedMovies = recommendationResponse?.results || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ToastContainer />
      <LoadingComponent />
      <Banner movieDetail={movieDetail} handleAddFavorite={handleAddFavorite} />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-5 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieDetail?.credits?.cast || []} />
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isLoadingRelated}
            />
          </div>
          <div className="flex-1">
            <Information
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
