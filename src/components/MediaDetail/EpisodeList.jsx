import useFetch from "@hooks/useFetch";
import { useParams } from "react-router-dom";
import SeaSonItem from "./SeaSonItem";
import { useState } from "react";
import EpisodeItem from "./EpisodeItem";
import ImageComponent from "@components/ImageComponent";

const EpisodeList = () => {
  const { seriesId, seasonNumber } = useParams();
  const [isShowMore, setIsShowMore] = useState("");

  // Lấy tất cả các tập
  const { data } = useFetch({
    url: `/tv/${seriesId}/season/${seasonNumber}`,
  });
  const episodeLists = data?.episodes || [];
  console.log(episodeLists);

  // Lấy tên chương
  const { data: title } = useFetch({
    url: `/tv/${seriesId}/season/${seasonNumber}?language=vi`,
  });
  console.log("data", title);

  return (
    <div className="bg-black px-5 text-[1.9vw] text-white sm:px-24 sm:text-[1.2vw]">
      {/* Thông tin mùa */}
      <div className="mb-3 flex items-center gap-3">
        <ImageComponent
          className=""
          src={`https://image.tmdb.org/t/p/original${title?.poster_path}`}
          alt={`${title?.name}`}
          width={50}
          height={50}
        />
        <p className="text-[4vw] font-bold sm:text-[1.8vw]">{title?.name}</p>
      </div>

      <p className="font-bold">Danh sách tập {episodeLists.length}</p>
      {episodeLists.map((episodeList) => {
        return (
          <div key={episodeList.id}>
            <SeaSonItem
              posterPath={episodeList?.still_path}
              name={episodeList?.name}
              voteAverage={episodeList?.vote_average}
              airDate={episodeList?.air_date}
              episodeCount={episodeList?.episode_count}
              overview={episodeList?.overview}
              runtime={episodeList?.runtime}
            />

            {isShowMore === episodeList.id && (
              <EpisodeItem episodeList={episodeList} />
            )}
            {isShowMore !== episodeList.id && (
              <p
                onClick={() => setIsShowMore(episodeList.id)}
                className="mt-1 cursor-pointer"
              >
                Xem thêm
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default EpisodeList;
