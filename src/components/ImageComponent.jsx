import { useEffect, useState } from "react";

const ImageComponent = ({ src, alt, className, width, height }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=%22Loading%22`,
  );
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);
  return (
    <img
      className={currentSrc === src ? className : `${className} blur-md`}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
export default ImageComponent;
