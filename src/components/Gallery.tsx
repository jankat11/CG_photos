import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import UnsplashContext from "../appContext";
import Spinner from "./Spinner";
import ImageItem from "./ImageItem";
import { FavoryItem, Img } from "../app.modal";
import EmptyInfo from "./EmptyInfo";
import { AnimatePresence, motion } from "framer-motion";
import UpArrow from "./UpArrow";

const url: string = import.meta.env.VITE_BASE_URL;

const Gallery = () => {
  const {
    searchValue,
    isMyGalleryOpen,
    favoryImages,
    galleryPage,
    imagesData,
    nextGalleryPage,
    setImagesData,
  } = useContext(UnsplashContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const pageRef = useRef(2);
  const touchRef = useRef(false);

  const fetchImages = async (pageParam: number) => {
    setIsFetchingNextPage(true);
    const urlParameters = `?per_page=24&page=${pageParam}&query=${
      searchValue ? searchValue : "beautiful"
    }`;
    const { data } = await axios.get(url + urlParameters);
    touchRef.current = false;
    setImagesData(data);
    setIsFetchingNextPage(false);
    return data;
  };

  const handleFetch = () => {
    fetchImages(pageRef.current);
    console.log("ref: ", pageRef.current, "data is: ", imagesData);
    pageRef.current++;
  };

  const handleScroll = () => {
    if (
      !touchRef.current &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 600
    ) {
      if (!isMyGalleryOpen) {
        touchRef.current = true;
        const totalPage = parseInt(imagesData?.total_pages);
        console.log(totalPage, imagesData);

        if (!totalPage || totalPage >= pageRef.current) {
          handleFetch();
          console.log(searchValue);
        }

        return;
      } else {
        if (favoryImages.length > galleryPage) nextGalleryPage();
      }
    }
  };

  const initialLoad = () => {
    setIsLoading(true);
    fetchImages(1).then(() => {
      setIsLoading(false);
      pageRef.current = 2;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMyGalleryOpen, galleryPage, searchValue, imagesData]);

  useEffect(() => {
    initialLoad();
  }, [searchValue]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isMyGalleryOpen) {
    return (
      <>
        {favoryImages.length !== 0 ? (
          <section className="image-container">
            <AnimatePresence>
              {favoryImages.slice(0, galleryPage).map((item: FavoryItem) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0.82 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="position-relative"
                  >
                    <ImageItem isGallery={true} favory={item} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <UpArrow />
          </section>
        ) : (
          <EmptyInfo />
        )}
      </>
    );
  }

  return (
    <>
      {!isLoading &&
        (parseInt(imagesData?.total) !== 0 &&
        imagesData?.results.length !== 0 ? (
          <section className="image-container">
            {imagesData?.results.map((img: Img) => {
              return <ImageItem key={img.id} isGallery={false} image={img} />;
            })}
          </section>
        ) : (
          <EmptyInfo result={true} />
        ))}
        <UpArrow />
      {isFetchingNextPage && <Spinner bottomSpiner={true} />}
    </>
  );
};

export default Gallery;
