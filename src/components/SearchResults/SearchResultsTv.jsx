import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const SearchResultsTv = ({ item }) => {
  return (
    <div
      key={item?.id}
      className="mb-5 flex gap-2 rounded-xl border border-slate-500 bg-slate-950 shadow-2xl sm:gap-5"
    >
      <ImageComponent
        src={
          item?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item?.poster_path}`
            : "/actorNoImage.svg"
        }
        alt="No Image"
        className="w-[80px] rounded-xl object-cover sm:w-[full]"
        height={80}
        width={150}
      />

      <div>
        <Link to={`/detail/tv/${item.id}`}>
          <p className="mt-3 font-bold">{item?.name}</p>
        </Link>
        <p className="font-medium text-slate-300">{item?.first_air_date}</p>
        <p className="mt-3 py-2 text-slate-200">{item?.overview}</p>
      </div>
    </div>
  );
};
export default SearchResultsTv;
