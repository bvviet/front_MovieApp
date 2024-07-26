import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";

const LoadingComponent = () => {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
