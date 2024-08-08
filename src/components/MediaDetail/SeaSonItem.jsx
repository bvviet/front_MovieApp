import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const SeaSonItem = ({
  seriesId = 0,
  seasonNumber = 0,
  posterPath,
  name,
  voteAverage,
  airDate,
  episodeCount,
  overview,
  runtime,
}) => {
  return (
    <div className="mt-2 flex flex-col items-center gap-2 rounded-lg border sm:flex-row sm:gap-3">
      <div>
        <Link to={`/tv/${seriesId}/season/${seasonNumber}`}>
          <ImageComponent
            width={180}
            height={150}
            src={`https://image.tmdb.org/t/p/original/${posterPath}`}
            className="w-[350px] rounded-lg sm:h-[150px] sm:w-[180px]"
          />
        </Link>
      </div>
      <div className="mr-auto flex flex-col gap-1 p-3 sm:p-3">
        <p className="text-[1.9vw] font-bold sm:text-[1.5vw]">{name}</p>
        <div className="flex items-center gap-1 sm:gap-2">
          <p className="font-bold">Rating</p>
          <CircularProgressBar
            percent={Math.round(voteAverage * 10)}
            size={2.5}
            strokeWidth={0.2}
          />
          <p className="ml-2 font-bold">Release Date:</p>
          <p className="text-slate-300">{airDate}</p>
          {runtime && <p className="ml-2 font-bold">{runtime}m</p>}
        </div>
        {episodeCount && (
          <p className="mt-1 font-bold">
            {episodeCount} <span className="text-slate-300">Episodes</span>
          </p>
        )}
        <p className="mt-1 text-slate-200">{overview}</p>
      </div>
    </div>
  );
};
export default SeaSonItem;
