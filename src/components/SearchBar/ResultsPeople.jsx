import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResultsPeople = ({ resultPersons }) => {
  return (
    <div>
      <h3 className="text-[1.1vw] font-bold">
        <FontAwesomeIcon
          icon={faUser}
          className="cursor-pointer text-black sm:mr-2"
        />
        People ({resultPersons.length})
      </h3>
      {resultPersons.slice(0, 3).map((item) => (
        <ul key={item.id}>
          <li className="sm:p-1 hover:text-yellow-800 cursor-pointer">{item.name}</li>
        </ul>
      ))}
    </div>
  );
};
export default ResultsPeople;
