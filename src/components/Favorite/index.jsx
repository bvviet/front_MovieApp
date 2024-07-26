import { FAVORITES_TABS } from "../../libs/constants";
import MediaList from "../MediaList";

const Favorite = () => {
  return (
    <div>
      <MediaList title="Favorites" tabs={FAVORITES_TABS} />
    </div>
  );
};
export default Favorite;
