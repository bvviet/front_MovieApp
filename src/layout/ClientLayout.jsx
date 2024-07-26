import { ToastContainer } from "react-toastify";
import FeatureMovies from "../components/FeatureMovies";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import LoadingComponent from "../components/Loading/Loading";

const ClientLayout = () => {
  return (
    <div>
      <ToastContainer />
      <LoadingComponent />
      <Header />
      <FeatureMovies />
      <Outlet />
    </div>
  );
};
export default ClientLayout;
