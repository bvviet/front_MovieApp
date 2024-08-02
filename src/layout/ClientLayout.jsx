import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import LoadingComponent from "../components/Loading/Loading";

const ClientLayout = () => {
  return (
    <div>
      <ToastContainer />
      <LoadingComponent />
      <Header />
      <Outlet />
    </div>
  );
};
export default ClientLayout;
