import useFetch from "@hooks/useFetch";
import { debounce } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SearchContext = createContext();

const SearchProvide = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [valueInput, setValueInput] = useState("");

  const debouncedFetch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  useEffect(() => {
    if (valueInput.trim()) {
      debouncedFetch(valueInput);
    } else {
      setSearchQuery(""); // Clear search results if input is empty
    }
  }, [valueInput, debouncedFetch]);

  // Fetch data
  const { data: movies } = useFetch({
    url: `/search/movie?&query=${searchQuery}&page=1&language=vi`,
    skip: !searchQuery,
  });
  const resultMovies = movies?.results || [];

  const { data: tv } = useFetch({
    url: `/search/tv?&query=${searchQuery}&page=1&language=vi`,
    skip: !searchQuery,
  });
  const resultTvShows = tv?.results || [];

  const { data: persons } = useFetch({
    url: `/search/person?&query=${searchQuery}&page=1&language=vi`,
    skip: !searchQuery,
  });
  const resultPersons = persons?.results || [];

  const { data: trending } = useFetch({ url: `/trending/all/day?language=vi` });
  const resultTrending = trending?.results || [];

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        valueInput,
        setValueInput,
        movies,
        tv,
        persons,
        resultMovies,
        resultTvShows,
        resultPersons,
        resultTrending,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export default SearchProvide;
