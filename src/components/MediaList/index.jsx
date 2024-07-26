import { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Test from "./test";
import { useUser } from "@clerk/clerk-react";
import { LoadingContext } from "../../contexts/LoadingContext";

const MediaList = ({ title, tabs }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const [trenDings, setTrenDings] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const { user } = useUser();

  useEffect(() => {
    const fetchTrenDing = async () => {
      const url = tabs.find((tab) => tab?.id === activeTabId)?.url;
      try {
        if (url) {
          setIsLoading(true);
          const res = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGZiNGQ3Mjk1NGQ5ZWU2NDBkNjdhNjM3MjQzZDRiNyIsIm5iZiI6MTcyMTAzOTk4OS40MzkxNDIsInN1YiI6IjY2OTRmYjdlZmY3M2RhMWRjZWFkNjljZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QB9xg_iDHK5PYkwZX_1XT4wPjUOxyiq60BF2fw9b1Ak",
            },
          });
          const data = await res.json();
          const trendingMediaList = data.results.slice(0, 12);
          setTrenDings(trendingMediaList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrenDing();
  }, [activeTabId, tabs, setIsLoading]);

  // Lấy danh sách phim yêu thích
  useEffect(() => {
    if (tabs.some((tab) => tab.type === "favorite")) {
      const fetchFavorite = async () => {
        if (!user?.id) {
          console.error("User ID is not available.");
          return;
        }

        const favoriteTab = tabs.find((tab) => tab.type === "favorite");
        if (!favoriteTab) {
          console.error("Favorite tab not found.");
          return;
        }

        const url = `${favoriteTab.url}${user.id}`;
        try {
          setIsLoading(true);
          const res = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          });
          if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
          }
          const data = await res.json();
          setTrenDings(data.favorites.movies);
          console.log(data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFavorite();
    }
  }, [tabs, user?.id]);

  const handleDeleteSuccess = (deletedMovieId) => {
    setTrenDings((prevMovies) =>
      prevMovies.filter((movie) => movie.movieId !== deletedMovieId),
    );
  };

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
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
            idTabs={tabs.map((tab) => tab.id)}
            handleDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </div>
      <Test />
    </div>
  );
};
export default MediaList;
