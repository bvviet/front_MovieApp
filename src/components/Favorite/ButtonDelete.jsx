import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MessagesContext } from "../../contexts/MessagesContext";

const ButtonDelete = ({ idMovie, handleDeleteSuccess }) => {
  const { user } = useUser();
  const userId = user.id;
  const { setMessages } = useContext(MessagesContext);

  const handleDelete = async () => {
    try {
      if (userId && idMovie) {
        const res = await fetch(
          `https://back-end-movie-app-bvv.vercel.app/movies/favorites/${userId}/${idMovie}`,
          {
            method: "DELETE",
          },
        );
        const result = await res.json();
        console.log(result);
        if (res.status === 200) {
          toast.success("Xóa thành công!", {
            position: "top-right",
            autoClose: 1500,
          });
          handleDeleteSuccess(idMovie);
        }
      }
    } catch (error) {
      let errorMessage = "";
      if (!error.response) {
        errorMessage = "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.";
      } else if (error.response.status === 404) {
        errorMessage = "API hiện tại đang bị lỗi :((";
      } else if (error.response.data.message || error.response.data.errors) {
        errorMessage =
          error.response.data.message || error.response.data.errors[0];
      } else {
        errorMessage = "Đã xảy ra lỗi vui lòng thử lại";
      }
      setMessages(errorMessage);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute bottom-2 right-[15px] z-10 cursor-pointer sm:right-[-50px] sm:mr-20"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default ButtonDelete;
