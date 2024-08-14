import MovieCard from "@components/MovieCard";

const RelatedMediaList = ({ mediaList, isLoading, title }) => {
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="mt-3 sm:mt-8">
      <p className="mb-1 text-[1.5vw] font-bold sm:mb-3">{title}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
        {mediaList.map((media) => (
          <MovieCard
            media_type={media.media_type}
            data={media}
            key={media.id}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedMediaList;
