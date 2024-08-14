import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const { user } = useUser();
  const [moviesFavorite, setMoviesFavorite] = useState([]);

  const fetchFavorite = async () => {
    if (user) {
      const res = await axios.get(
        `https://back-end-movie-app-bvv.vercel.app/movies/accountId/${user?.id}`,
      );
      setMoviesFavorite(res?.data?.favorites?.movies || []);
    }
  };

  useEffect(() => {
    fetchFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <FavoriteContext.Provider
      value={{ moviesFavorite, setMoviesFavorite, fetchFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteProvider, FavoriteContext };
