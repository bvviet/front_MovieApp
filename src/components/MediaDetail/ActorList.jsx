import { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentActor = isShowMore ? actors : actors.slice(0, 4);
  return (
    <div>
      <p className="text-[1.5vw] font-bold">Actors</p>
      <div className="mt-2 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-4">
        {currentActor.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
          />
        ))}
      </div>
      <p
        onClick={() => setIsShowMore(!isShowMore)}
        className="mt-2 cursor-pointer"
      >
        {isShowMore ? "Ẩn bớt" : "Xem Thêm"}
      </p>
    </div>
  );
};
export default ActorList;
