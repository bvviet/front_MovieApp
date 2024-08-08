import { useState } from "react";
import SeaSonItem from "./SeaSonItem";

const SeaSonsList = ({ seasons = [], seriesId }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentSeason = isShowMore ? seasons : seasons.slice(0, 3);
  console.log(currentSeason);

  return (
    <div className="mt-2 sm:mt-5 text-[1.3vw]">
      <p className="text-[1.7vw] font-bold">Seasons</p>
      {currentSeason.map((season) => (
        <SeaSonItem
          key={season?.id}
          seriesId={seriesId}
          seasonNumber={season?.season_number}
          posterPath={season?.poster_path}
          name={season?.name}
          voteAverage={season?.vote_average}
          airDate={season?.air_date}
          episodeCount={season?.episode_count}
          overview={season?.overview}
        />
      ))}
      <p
        className="m-2 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Ẩn bớt" : "Xem thêm"}
      </p>
    </div>
  );
};
export default SeaSonsList;
