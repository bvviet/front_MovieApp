import MediaList from "../components/MediaList";
import { TOP_RATED_TABS, TRENDING_TABS } from "../libs/constants";

const Home = () => {
  return (
    <div>
      <MediaList title="Trending" tabs={TRENDING_TABS} />
      <MediaList title="Top" tabs={TOP_RATED_TABS} />
    </div>
  );
};
export default Home;
