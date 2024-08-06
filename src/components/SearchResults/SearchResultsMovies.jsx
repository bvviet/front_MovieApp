import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const SearchResultsMovies = ({ item }) => {
  return (
    <div className="mb-5 flex gap-2 rounded-xl border border-slate-500 bg-slate-950 shadow-2xl sm:gap-4">
      <ImageComponent
        src={
          item?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item?.poster_path}`
            : "/actorNoImage.svg"
        }
        alt="No Image"
        className="w-[80px] rounded-xl object-cover sm:w-[full]"
        width={120}
        height={70}
      />

      <div>
        <Link to={`/detail/movie/${item.id}`}>
          <p className="mt-3 text-[1.2vw] font-bold">{item?.title}</p>
        </Link>
        <p className="font-medium text-slate-300">{item?.release_date}</p>
        <p className="leading-leading-loose py-2 pr-3 font-light text-slate-200">
          {item?.overview}
        </p>
      </div>
    </div>
  );
};
export default SearchResultsMovies;
