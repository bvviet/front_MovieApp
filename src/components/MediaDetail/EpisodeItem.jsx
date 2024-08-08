import ImageComponent from "@components/ImageComponent";
import useFetch from "@hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "react-modal";
import "../Trailer/TrailerComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// Thiết lập cho Modal
Modal.setAppElement("#root");

const EpisodeItem = ({ episodeList }) => {
  const { seriesId, seasonNumber } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  console.log(showTrailer);

  //   Lấy hình ảnh
  const { data: image } = useFetch({
    url: `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeList?.episode_number}/images`,
  });
  const images = image?.stills || [];

  //   Lấy hình video
  const { data: video } = useFetch({
    url: `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeList?.episode_number}/videos`,
  });
  const videos = video?.results || [];
  console.log("videos", videos);

  const crews = (episodeList?.crew || [])
    .filter((crew) => ["Director", "Writer"].includes(crew.job))
    .map((crew) => ({
      id: crew?.id,
      job: crew?.job,
      name: crew?.name,
    }));

  const guestStars = (episodeList?.guest_stars || []).map((guestStar) => ({
    creditId: guestStar.credit_id,
    name: guestStar.name,
    character: guestStar.character,
    profilePath: guestStar.profile_path,
  }));

  return (
    <div className="rounded-b-lg border border-t-0 border-slate-400">
      <div className="-mt-2 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {/* Crews */}
        <div>
          <h2 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-lg">
            Crew
          </h2>
          {crews.map((crew) => (
            <p key={crew.id} className="py-[2px]">
              <span className="font-bold">{crew.job}:</span> {crew.name}
            </p>
          ))}
          {videos.length > 0 ? (
            <div className="my-2 sm:my-5">
              <p className="font-bold">Video</p>
              {videos.map((vd, index) => (
                <div key={index} className="my-1">
                  <div
                    onClick={() => setShowTrailer(true)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <p>Xem</p>
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="mr-1 text-[10px] sm:text-[20px]"
                      />
                    </div>
                  </div>
                  <Modal
                    isOpen={showTrailer}
                    onRequestClose={() => setShowTrailer(false)}
                    className="ReactModal__Content"
                    overlayClassName="ReactModal__Overlay"
                    contentLabel="Trailer Modal"
                  >
                    <button
                      onClick={() => setShowTrailer(false)}
                      className="close-button"
                    >
                      &times;
                    </button>
                    {vd.key == null ? (
                      <p>Phim hiện tại phim chưa có Trailer</p>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${vd.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="iframe"
                      ></iframe>
                    )}
                  </Modal>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2">Không có video</p>
          )}
        </div>
        {/* Guest Stars */}
        <div className="grid grid-cols-2 gap-4">
          {guestStars.map((guestStar) => (
            <div
              key={guestStar.creditId}
              className="flex items-center gap-3 rounded-lg border border-gray-300 p-2 shadow-sm"
            >
              <ImageComponent
                className="h-60px w-[60px] rounded-full"
                src={`https://image.tmdb.org/t/p/original${guestStar?.profilePath}`}
                alt={`${guestStar.name}`}
                width={60}
                height={60}
              />
              <div>
                <p className="font-bold">{guestStar.name}</p>
                <p>{guestStar.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Image Slider */}
      <div className="flex gap-3 overflow-x-auto px-4">
        {images.map((img, index) => (
          <ImageComponent
            key={index}
            className="h-[60px] w-[110px] rounded-lg sm:h-[90px] sm:w-[160px]"
            src={`https://image.tmdb.org/t/p/original${img?.file_path}`}
            alt={`${img.name}`}
            width={160}
            height={90}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeItem;
