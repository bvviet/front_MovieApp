const TvShowInformation = ({ tvShowInfo = {} }) => {
  return (
    <div>
      <p className="text-[1.5vw] font-bold">Information</p>
      <div className="mt-2 flex flex-col gap-1 sm:gap-4">
        <div>
          <p className="font-bold">Original Title</p>
          <p>{tvShowInfo?.original_name}</p>
        </div>
        <div>
          <p className="font-bold">Origin Country</p>
          <div className="mt-1 flex gap-3">
            {tvShowInfo?.origin_country.map((country) => (
              <img
                className="w-5 sm:w-12"
                key={country}
                src={`https://flagcdn.com/32x24/${country.toLowerCase()}.png`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Status</p>
          <p>{tvShowInfo?.status}</p>
        </div>
        <div>
          <p className="font-bold">Network</p>
          <p>
            {tvShowInfo?.networks.map((network) => (
              <img
                className="mt-1 w-5 invert sm:w-16"
                key={network.id}
                src={`https://media.themoviedb.org/t/p/h30/${network.logo_path}`}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TvShowInformation;
