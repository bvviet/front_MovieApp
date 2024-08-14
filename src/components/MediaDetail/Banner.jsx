import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../CircularProgressBar";
import { groupBy } from "lodash";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
// import TrailerComponent from "../Trailer/Trailer";
import { FavoriteContext } from "@contexts/FavoriteContext";
import { useContext } from "react";
import ImageComponent from "@components/ImageComponent";
import { useModalContext } from "@contexts/ModalContext";

const Banner = ({
  id,
  title,
  backdropPath,
  posterPath,
  voteAverage,
  releaseDate,
  genres,
  crews,
  certification,
  overview,
  handleAddFavorite,
  trailerVideoKey,
}) => {
  const { moviesFavorite } = useContext(FavoriteContext);

  const { openPopup } = useModalContext();

  const groupedCrews = groupBy(crews, "job");

  return (
    <div className="relative overflow-hidden text-white">
      <ImageComponent
        className="absolute inset-0 aspect-video h-[100%] w-full brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={`Không có hình ảnh`}
        width={1000}
        height={250}
      />
      <div className="relative mx-auto flex max-w-[1280px] gap-4 px-6 pt-10 sm:gap-6 lg:gap-8">
        <div className="flex-1">
          <ImageComponent
            src={`https://image.tmdb.org/t/p/original${posterPath}`}
            width={257}
            height={363}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-[6px] sm:gap-4">
            <span className="border p-1 text-gray-400 sm:p-2">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((genre) => genre?.name).join(", ")}</p>
          </div>
          <div className="mt-2 flex items-center gap-2 sm:mt-4 sm:gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(voteAverage * 10)}
                size={3.5}
                strokeWidth={0.3}
                strokeColor={
                  voteAverage >= 7
                    ? "green"
                    : voteAverage >= 5
                      ? "orange"
                      : "red"
                }
              />
              Rating
            </div>

            <button
              onClick={() => {
                openPopup(
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className="aspect-video w-[50vw]"
                  />,
                );
              }}
              className="flex items-center"
            >
              <FontAwesomeIcon
                icon={faPlay}
                className="mr-1 text-[10px] sm:text-[20px]"
              />
              Trailer
            </button>

            <div>
              <button onClick={handleAddFavorite}>
                {moviesFavorite.some((movie) => movie.movieId == id) ? (
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
            <p>{overview}</p>
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
