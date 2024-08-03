import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import { Skeleton } from "@mui/material";

const MovieCard = ({ data, media_type, isLoading }) => {
  return (
    <div className="relative rounded-lg border border-slate-800">
      {media_type === "tv" && (
        <p className="absolute right-1 top-1 rounded bg-black p-1 text-sm font-bold text-white shadow-lg">
          TV Show
        </p>
      )}
      <Link to={`/detail/${media_type}/${data?.id || data.movieId}`}>
        {isLoading || !data?.poster_path ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            className="h-[300px] w-[100%] sm:h-[450px]"
          />
        ) : null}
        <img
          className={`rounded-lg ${isLoading ? "hidden" : "block"}`}
          src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
          alt={`${data.title || data.name}`}
          onLoad={isLoading}
        />
      </Link>
      <div className="relative top-[1.5vw] px-1 pb-3 sm:px-4 sm:pb-9">
        <CircularProgressBar
          percent={Math.round(data.vote_average * 10)}
          strokeColor={
            data.vote_average >= 7
              ? "green"
              : data.vote_average >= 5
                ? "orange"
                : "red"
          }
        />
        <p className="mt-2 font-bold">{data.title || data.name}</p>
        <p className="text-slate-300">
          {data.release_date || data.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
