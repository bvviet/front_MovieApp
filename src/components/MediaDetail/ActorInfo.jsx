import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link to={`/people/${id}`}>
      <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
        <ImageComponent
          src={
            profilePath
              ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
              : "/actorNoImage.svg"
          }
          alt=""
          className="w-[100%] rounded-lg"
          width={276}
          height={350}
        />
        <div className="p-1 sm:p-3">
          <p className="font-bold">{name}</p>
          <p>{character}</p>
          {episodeCount && (
            <p>
              {episodeCount > 1
                ? `${episodeCount} Episodes`
                : `${episodeCount} Episode`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default ActorInfo;
