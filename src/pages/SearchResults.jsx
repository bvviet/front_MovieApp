import SearchResultsMovies from "@components/SearchResults/SearchResultsMovies";
import SearchResultsPersons from "@components/SearchResults/SearchResultsPersons";
import SearchResultsTv from "@components/SearchResults/SearchResultsTv";
import { useSearch } from "@contexts/SearchContext";
import { useState } from "react";

const SearchResults = () => {
  const { movies, tv, persons } = useSearch();
  const [activeResult, setActiveResult] = useState({});
  const [activeBackground, setActiveBackground] = useState("");

  const acting = (activeResult.results || []).map((item) =>
    (item.known_for || []).map((result) => result.name).join(", "),
  );

  console.log(acting);

  console.log("activeResult", activeResult);

  return (
    <div className="flex min-h-screen gap-3 bg-black px-3 py-10 text-white sm:gap-12 sm:px-24">
      <div className="flex-1">
        <div className="rounded border border-slate-500">
          <h1 className="bg-slate-500 px-4 py-2 text-[1.3vw] font-bold sm:py-3">
            Search Results
          </h1>
          <div className="my-2 text-[1.2vw] sm:my-3">
            <ul
              onClick={() => {
                setActiveResult(persons);
                setActiveBackground("persons");
              }}
              className={`${activeBackground == "persons" ? "bg-slate-600" : ""} flex cursor-pointer items-center justify-between px-4 py-1 transition ease-in-out hover:bg-slate-600 sm:py-2`}
            >
              <li className="">People</li>
              <p className="rounded-md bg-slate-700 px-1 text-[1vw]">
                {persons?.total_results}
              </p>
            </ul>

            <ul
              onClick={() => {
                setActiveResult(movies);
                setActiveBackground("movies");
              }}
              className={`${activeBackground == "movies" ? "bg-slate-600" : ""} flex cursor-pointer items-center justify-between px-4 py-1 transition ease-in-out hover:bg-slate-600 sm:py-2`}
            >
              <li className="">Movies</li>
              <p className="rounded-md bg-slate-700 px-1 text-[1vw]">
                {movies?.total_results}
              </p>
            </ul>

            <ul
              onClick={() => {
                setActiveResult(tv);
                setActiveBackground("tv");
              }}
              className={`${activeBackground == "tv" ? "bg-slate-600" : ""} flex cursor-pointer items-center justify-between px-4 py-1 transition ease-in-out hover:bg-slate-600 sm:py-2`}
            >
              <li className="">TV Shows</li>
              <p className="rounded-md bg-slate-700 px-1 text-[1vw]">
                {tv?.total_results}
              </p>
            </ul>
          </div>
        </div>
      </div>
      {/* Kết quả tìm kiếm */}
      <div className="flex-[3]">
        <div className="text-[1.2vw]">
          {(activeResult?.results || []).map((item) => (
            <div key={item.id}>
              {activeBackground === "persons" && (
                <SearchResultsPersons item={item} />
              )}
              {activeBackground === "movies" && (
                <SearchResultsMovies item={item} />
              )}
              {activeBackground === "tv" && <SearchResultsTv item={item} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
