import { BsFillHeartFill } from "react-icons/bs";
import { useState, useContext, useEffect, memo } from "react";
import UnsplashContext from "../appContext";

interface Props {
  imgId: string | undefined
  largeImg: string | undefined;
  smallImg: string | undefined;
}

const pink = "#ec4899";
const white = "white";

const Heart: React.FC<Props> = ({ imgId, largeImg, smallImg }) => {
  const { addGallery, removeGallery, favoryImages, isMyGalleryOpen } =
    useContext(UnsplashContext);
  const [color, setColor] = useState<string>(white);

  const handleColorChange = () => {
    if (color === white) {
      addGallery({ id: imgId, urlLarge: largeImg, urlSmall: smallImg });
    } else {
      removeGallery(imgId ? imgId : "");
    }
    setColor((prev) => (prev === pink ? white : pink));
  };

  useEffect(() => {
    const favoried = favoryImages.some((item) => {
      return item.id === imgId;
    });
    if (favoried) setColor(pink);
  }, [color]);

  return (
    <div
      onClick={handleColorChange}
      className="heart-wrapper position-absolute"
    >
      <BsFillHeartFill style={{ color }} className="heart" />
    </div>
  );
};
export default memo(Heart);
