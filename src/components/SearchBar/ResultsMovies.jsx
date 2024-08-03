import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ResultsMovies = ({ resultMovies }) => {
  return (
    <div>
      <h3 className="text-[1.1vw] font-bold">
        <FontAwesomeIcon
          icon={faFilm}
          className="cursor-pointer text-black sm:mr-2"
        />
        Movies ({resultMovies.length})
      </h3>
      {resultMovies.slice(0, 3).map((item) => (
        <ul key={item.id}>
          <Link to={`/detail/movie/${item.id}`}>
            <li className="sm:p-1 hover:text-yellow-800">{item.title}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
};
export default ResultsMovies;
