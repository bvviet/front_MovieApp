import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MessagesContext } from "../../contexts/MessagesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import CircularProgressBar from "../CircularProgressBar";
import { groupBy } from "lodash";
import LoadingComponent from "../Loading/Loading";
import { LoadingContext } from "../../contexts/LoadingContext";

const DetailMovie = () => {
  const { user } = useUser();
  const [movieDetail, setMovieDetail] = useState();
  let { movieId } = useParams();
  let { mediaType } = useParams();
  const { setMessages } = useContext(MessagesContext);
  const { setIsLoading } = useContext(LoadingContext);

  // Get detail
  useEffect(() => {
    const fetchDetail = async () => {
      const urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?language=vi&append_to_response=release_dates,credits`;
      const urlTv = `https://api.themoviedb.org/3/tv/${movieId}?language=vi&append_to_response=release_dates,credits`;
      try {
        setIsLoading(true);
        const res = await fetch(mediaType == "tv" ? urlTv : urlMovie, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGZiNGQ3Mjk1NGQ5ZWU2NDBkNjdhNjM3MjQzZDRiNyIsIm5iZiI6MTcyMTAzOTk4OS40MzkxNDIsInN1YiI6IjY2OTRmYjdlZmY3M2RhMWRjZWFkNjljZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QB9xg_iDHK5PYkwZX_1XT4wPjUOxyiq60BF2fw9b1Ak",
          },
        });

        const data = await res.json();
        setMovieDetail(data);
      } catch (error) {
        let errorMessage = "";
        if (!error.response) {
          errorMessage =
            "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.";
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
    fetchDetail();
  }, [mediaType, movieId, setMessages, setIsLoading]);

  //   Them vao yeu thich
  const handleAddFavorite = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://back-end-movie-app-bvv.vercel.app/movies/ ",
        {
          userId: user.id,
          movieId: movieId,
          poster_path: movieDetail?.poster_path,
          title: movieDetail?.title || movieDetail?.name,
          release_date:
            movieDetail?.release_date || movieDetail?.first_air_date,
          vote_average: movieDetail?.vote_average,
          media_type: mediaType,
        },
      );
      if (res.status === 200) {
        toast.success("Thêm thành công!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      let errorMessage = "";
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
  const groupedCrews = groupBy(crews, "job");

  return (
    <div className="relative h-[100vh] overflow-hidden text-white">
      <ToastContainer />
      <LoadingComponent />
      <img
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
        alt={`${movieDetail?.backdrop_path}`}
      />
      <div className="relative mx-auto flex max-w-[1280px] gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
            alt={`${movieDetail?.poster_path}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">
            {movieDetail?.title || movieDetail?.name}
          </p>
          <div className="flex items-center gap-4">
            <span className="border px-2 text-gray-400">{certification}</span>
            <p>{movieDetail?.release_date || movieDetail?.first_air_date}</p>
            <p>
              {(movieDetail?.genres || [])
                .map((genre) => genre?.name)
                .join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-5">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(movieDetail?.vote_average * 10)}
                size={3.5}
                strokeWidth={0.3}
                strokeColor={
                  movieDetail?.vote_average >= 7
                    ? "green"
                    : movieDetail?.vote_average >= 5
                      ? "orange"
                      : "red"
                }
              />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
            <div>
              <button onClick={handleAddFavorite}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{movieDetail?.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew?.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailMovie;
