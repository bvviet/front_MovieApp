import { useContext, useState } from "react";

import Test from "./test";
import { LoadingContext } from "../../contexts/LoadingContext";
import MovieCard from "@components/MovieCard";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const urlTrending = tabs.find((tab) => tab?.id === activeTabId)?.url;

  const { data, isLoading } = useFetch({ url: urlTrending });
  const trenDings = data?.results || [];
  setIsLoading(isLoading);

  return (
    <div className="bg-black px-8 py-10 text-[1.8vw] text-white sm:text-[1.2vw]">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:gap-6">
        {trenDings.map((item, index) => (
          <MovieCard
            data={item}
            media_type={item.media_type || activeTabId}
            key={index}
          />
        ))}
      </div>
      <Test />
    </div>
  );
};
export default MediaList;
