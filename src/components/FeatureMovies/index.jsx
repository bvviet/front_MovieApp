import { useEffect, useMemo, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import useFetch from "@hooks/useFetch";

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMovies } = useFetch({
    url: "/movie/popular?language=vi",
  });

  // Memoize giá trị của movies
  const movies = useMemo(
    () => (popularMovies?.results || []).slice(0, 4),
    [popularMovies],
  );

  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  useEffect(() => {
    if (movies.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movies]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie data={movie} key={movie.id} />
        ))}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovies;
