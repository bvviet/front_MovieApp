import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TrailerComponent.css";
import useFetch from "@hooks/useFetch";

// Thiết lập cho Modal
Modal.setAppElement("#root");

const TrailerComponent = ({ children, movieId }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const { data } = useFetch({ url: `/movie/${movieId}/videos` });

  useEffect(() => {
    if (data && data.results.length > 0) {
      setTrailerKey(data.results[0].key);
    } else {
      setTrailerKey(null);
    }
  }, [data]);

  return (
    <div>
      <div onClick={() => setShowTrailer(true)}>{children}</div>
      <Modal
        isOpen={showTrailer}
        onRequestClose={() => setShowTrailer(false)}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        contentLabel="Trailer Modal"
      >
        <button onClick={() => setShowTrailer(false)} className="close-button">
          &times;
        </button>
        {trailerKey == null ? (
          <p>Phim hiện tại phim chưa có Trailer</p>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="iframe"
          ></iframe>
        )}
      </Modal>
    </div>
  );
};

export default TrailerComponent;
