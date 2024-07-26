import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=vi",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGZiNGQ3Mjk1NGQ5ZWU2NDBkNjdhNjM3MjQzZDRiNyIsIm5iZiI6MTcyMTAzOTk4OS40MzkxNDIsInN1YiI6IjY2OTRmYjdlZmY3M2RhMWRjZWFkNjljZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QB9xg_iDHK5PYkwZX_1XT4wPjUOxyiq60BF2fw9b1Ak",
          },
        },
      );
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    };
    fetchPopularMovies();
  }, []);

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
