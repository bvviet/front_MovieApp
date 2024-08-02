const ActorInfo = ({ name, character, profilePath }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <img
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/actorNoImage.svg"
        }
        alt=""
        className="w-[100%] rounded-lg"
      />
      <div className="p-1 sm:p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
      </div>
    </div>
  );
};
export default ActorInfo;
