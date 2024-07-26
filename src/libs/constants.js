export const TRENDING_TABS = [
  {
    id: "all",
    name: "ALL",
    url: `https://api.themoviedb.org/3/trending/all/day?language=vi`,
  },
  {
    id: "movie",
    name: "Movie",
    url: `https://api.themoviedb.org/3/trending/movie/day?language=vi`,
  },
  {
    id: "tv",
    name: "TV Show",
    url: `https://api.themoviedb.org/3/trending/tv/day?language=vi`,
  },
];

export const TOP_RATED_TABS = [
  {
    id: "movie",
    name: "Movie",
    url: `https://api.themoviedb.org/3/movie/top_rated?language=vi`,
  },
  {
    id: "tv",
    name: "TV Show",
    url: `https://api.themoviedb.org/3/tv/top_rated?language=vi`,
  },
];

export const FAVORITES_TABS = [
  {
    id: "favorite",
    name: "All",
    type: "favorite",
    url: `https://back-end-movie-app-bvv.vercel.app/movies/accountId/`,
  },
];
