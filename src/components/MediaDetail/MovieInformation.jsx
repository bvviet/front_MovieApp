import { currencyFormatter } from "@libs/utils";

const MovieInformation = ({ movieInfo }) => {
  return (
    <div>
      <p className="text-[1.5vw] font-bold">Information</p>
      <div className="mt-2 flex flex-col gap-1 sm:gap-4">
        <div>
          <p className="font-bold">Original Title</p>
          <p>{movieInfo?.original_title}</p>
        </div>
        <div>
          <p className="font-bold">Origin Country</p>
          <div className="mt-1 flex gap-3">
            {movieInfo?.origin_country.map((country) => (
              <img
                key={country}
                src={`https://flagcdn.com/32x24/${country.toLowerCase()}.png`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Status</p>
          <p>{movieInfo?.status}</p>
        </div>
        <div>
          <p className="font-bold">Budget</p>
          <p>{currencyFormatter(movieInfo?.budget)}</p>
        </div>
        <div>
          <p className="font-bold">Revenue</p>
          <p>{currencyFormatter(movieInfo?.revenue)}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieInformation;
