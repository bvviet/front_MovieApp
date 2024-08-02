export const TRENDING_TABS = [
  {
    id: "all",
    name: "ALL",
    url: `/trending/all/day?language=vi`,
  },
  {
    id: "movie",
    name: "Movie",
    url: `/trending/movie/day?language=vi`,
  },
  {
    id: "tv",
    name: "TV Show",
    url: `/trending/tv/day?language=vi`,
  },
];

export const TOP_RATED_TABS = [
  {
    id: "movie",
    name: "Movie",
    url: `/movie/top_rated?language=vi`,
  },
  {
    id: "tv",
    name: "TV Show",
    url: `/tv/top_rated?language=vi`,
  },
];

export const FAVORITES_TABS = [
  {
    id: "favorite",
    name: "All",
    type: "favorite",
    url: `http://localhost:3000/movies/accountId/`,
  },
];
