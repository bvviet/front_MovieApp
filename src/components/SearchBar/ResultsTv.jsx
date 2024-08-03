import { faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ResultsTv = ({ resultTvShows }) => {
  return (
    <div>
      <h3 className="text-[1.1vw] font-bold">
        <FontAwesomeIcon
          icon={faTv}
          className="cursor-pointer text-black sm:mr-2"
        />
        TV Shows ({resultTvShows.length})
      </h3>
      {resultTvShows.slice(0, 3).map((item) => (
        <ul key={item.id}>
          <Link to={`/detail/tv/${item.id}`}>
            <li className="sm:p-1 hover:text-yellow-800">{item.name}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
};
export default ResultsTv;
