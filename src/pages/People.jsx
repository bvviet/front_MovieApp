import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import { useParams } from "react-router-dom";

const People = () => {
  const { peopleId } = useParams();

  const { data: peopleDetail } = useFetch({
    url: `/person/${peopleId}?append_to_response=combined_credits`,
  });

  const genders = {
    0: "Not set / not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  console.log(peopleDetail);
  console.log(peopleDetail?.combined_credits?.cast);
  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div className="container">
        <div className="flex-1">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${peopleDetail?.profile_path}`}
            alt={peopleDetail?.name}
            className="rounded"
          />
          <div>
            <p className="my-2 text-[1.4vw] font-bold">Person Info</p>
            <div>
              <div className="my-2">
                <p className="font-bold">Know For</p>
                <p>{peopleDetail?.known_for_department}</p>
              </div>
              <div className="my-2">
                <p className="font-bold">Gender</p>
                <p>{genders[peopleDetail?.gender]}</p>
              </div>
              <div className="my-2">
                <p className="font-bold">Place of Birth</p>
                <p>{peopleDetail?.birthday}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <p className="text-[1.4vw] font-bold">{peopleDetail?.name}</p>
          <p className="my-2 font-bold">Biography</p>
          <p className="whitespace-pre-line">{peopleDetail?.biography}</p>
          <RelatedMediaList
            mediaList={peopleDetail?.combined_credits?.cast || []}
            title="Known For"
          />
        </div>
      </div>
    </div>
  );
};
export default People;
