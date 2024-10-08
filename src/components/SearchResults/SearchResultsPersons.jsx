import ImageComponent from "@components/ImageComponent";

const SearchResultsPersons = ({ item }) => {
  return (
    <div
      key={item?.id}
      className="mb-5 flex gap-2 rounded-xl border border-slate-500 bg-slate-950 shadow-2xl sm:gap-4"
    >
      <ImageComponent
        src={
          item?.profile_path
            ? `https://image.tmdb.org/t/p/original${item?.profile_path}`
            : "/actorNoImage.svg"
        }
        alt="No Image"
        className="w-[80px] rounded-xl object-cover sm:w-[full]"
        width={80}
        height={120}
      />

      <div>
        <p className="mt-3 text-[1.2vw] font-bold">{item?.name}</p>
        <p className="font-medium text-slate-300">
          {(item.known_for || [])
            .map((result) => result.name || result.title)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};
export default SearchResultsPersons;
