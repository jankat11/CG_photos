import Heart from "./Heart";
import { FavoryItem, Img } from "../app.modal";

interface Props {
  image?: Img;
  favory?: FavoryItem;
  isGallery: boolean;
}

const ImageItem: React.FC<Props> = ({ isGallery, image, favory }) => {
  const largeImg = isGallery ? favory?.urlLarge : image?.urls.full;
  const smallImg = isGallery ? favory?.urlSmall : image?.urls.regular;
  const imgId = isGallery ? favory?.id : image?.id;

  return (
    <article className="position-relative">
      <a href={largeImg} target="_blank">
        <img className="img" src={smallImg} alt="none" />
      </a>
      <Heart largeImg={largeImg} smallImg={smallImg} imgId={imgId} />
    </article>
  );
};
export default ImageItem;
