import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../CircularProgressBar";
import { groupBy } from "lodash";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import TrailerComponent from "../Trailer/Trailer";
import { FavoriteContext } from "@contexts/FavoriteContext";
import { useContext } from "react";

const Banner = ({ movieDetail, handleAddFavorite }) => {
  const { moviesFavorite } = useContext(FavoriteContext);
  console.log("moviesFavorite", moviesFavorite);
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

  console.log(movieDetail?.vote_average);

  return (
    <div className="relative overflow-hidden text-white">
      <img
        className="absolute inset-0 w-full brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
        alt={`Không có hình ảnh`}
      />
      <div className="relative mx-auto flex max-w-[1280px] gap-4 px-6 pt-10 sm:gap-6 lg:gap-8">
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
          <div className="flex items-center gap-[6px] sm:gap-4">
            <span className="border p-1 text-gray-400 sm:p-2">
              {certification}
            </span>
            <p>{movieDetail?.release_date || movieDetail?.first_air_date}</p>
            <p>
              {(movieDetail?.genres || [])
                .map((genre) => genre?.name)
                .join(", ")}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 sm:mt-4 sm:gap-4">
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
            <TrailerComponent movieId={movieDetail?.id}>
              <button className="flex items-center">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-1 text-[10px] sm:text-[20px]"
                />
                Trailer
              </button>
            </TrailerComponent>
            <div>
              <button onClick={handleAddFavorite}>
                {moviesFavorite.some(
                  (movie) => movie.movieId == movieDetail?.id,
                ) ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-[10px] text-[red] sm:text-[20px]"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-[10px] sm:text-[20px]"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="mt-2 sm:mt-4">
            <p className="mb-1 text-[1.3vw] font-bold sm:mb-2">Overview</p>
            <p>{movieDetail?.overview}</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 sm:mt-4 sm:gap-2">
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
export default Banner;
