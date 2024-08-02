import { useContext } from "react";
import MovieCard from "@components/MovieCard";
import ButtonDelete from "./ButtonDelete";
import { FavoriteContext } from "@contexts/FavoriteContext";

const Favorite = () => {
  const { moviesFavorite, setMoviesFavorite, fetchFavorite } =
    useContext(FavoriteContext);

  // Hàm xử lý khi xóa thành công
  const handleDeleteSuccess = (deletedMovieId) => {
    setMoviesFavorite((prevMovies) =>
      prevMovies.filter((movie) => movie._id !== deletedMovieId),
    );
    fetchFavorite();
  };

  return (
    <div className="min-h-screen bg-black px-10 pt-5 text-white">
      <p className="mb-4 text-xl font-bold">Danh sách yêu phim thích</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:gap-6">
        {moviesFavorite.map((item) => (
          <div key={item._id} className="relative flex flex-col">
            <ButtonDelete
              idMovie={item.movieId}
              handleDeleteSuccess={handleDeleteSuccess}
            />
            <MovieCard data={item} media_type={item.media_type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
