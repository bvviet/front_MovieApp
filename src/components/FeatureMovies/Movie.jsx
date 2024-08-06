import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrailerComponent from "../Trailer/Trailer";
import ImageComponent from "@components/ImageComponent";

const Movie = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ImageComponent
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
        alt=""
        className="aspect-video w-full brightness-50"
        width={1000}
        height={800}
      />

      <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">{data.title}</p>
        <div>
          <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
            PG13
          </p>
          <p className="text-[1.2vw]">{data.release_date}</p>
        </div>

        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p>{data.overview}</p>
          </div>

          <div className="mt-4 flex">
            <TrailerComponent movieId={data?.id}>
              <button className="mr-2 rounded bg-white px-4 py-2 text-10 text-black lg:text-lg">
                <FontAwesomeIcon icon={faPlay} /> Trailer
              </button>
            </TrailerComponent>
            <button className="rounded bg-slate-300/50 px-4 py-2 text-10 text-black lg:text-lg">
              Thông tin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Movie;
