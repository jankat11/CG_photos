import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import UnsplashContext from "../appContext";
import Spinner from "./Spinner";
import ImageItem from "./ImageItem";
import { FavoryItem, Img } from "../app.modal";
import EmptyInfo from "./EmptyInfo";
import { AnimatePresence, motion } from "framer-motion";

const url: string = import.meta.env.VITE_BASE_URL;

const Gallery = () => {
  const {
    searchValue,
    isMyGalleryOpen,
    favoryImages,
    galleryPage,
    touch,
    setTouchTrue,
    setTouchFalse,
    nextGalleryPage,
  } = useContext(UnsplashContext);

  const [imagesData, setImagesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const reff = useRef(2);

  const fetchImages = async (pageParam: number) => {
    setIsLoading(true);
    const urlParameters = `?per_page=18&page=${pageParam}&query=${
      searchValue ? searchValue : "beautiful"
    }`;
    const { data } = await axios.get(url + urlParameters);
    setTouchFalse();
    setImagesData((prev) => {
      if (prev) {
        return {
          total: data.total,
          results: [...prev.results, ...data.results],
        };
      } else {
        return data;
      }
    });
    setIsLoading(false);
    return data;
  };

  const handleFetch = () => {
    fetchImages(reff.current);
    console.log("ref: ", reff.current, "data is: ", imagesData);
    reff.current++;
  };

  const handleScroll = () => {
    if (
      !touch &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 600
    ) {
      if (!isMyGalleryOpen) {
        setTouchTrue();
        handleFetch();
        return;
      } else {
        if (favoryImages.length > galleryPage) nextGalleryPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMyGalleryOpen, galleryPage, touch]);

  useEffect(() => {
    fetchImages(1);
  }, []);

  /*   if (isLoading) {
    return <Spinner />;
  } */

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
          </section>
        ) : (
          <EmptyInfo />
        )}
      </>
    );
  }

  return (
    <>
      {!false &&
        (parseInt(imagesData?.total) !== 0 ? (
          <section className="image-container">
            {imagesData?.results.map((img: Img) => {
              return <ImageItem key={img.id} isGallery={false} image={img} />;
            })}
          </section>
        ) : (
          <EmptyInfo result={true} />
        ))}
      {/* {isFetchingNextPage && <Spinner bottomSpiner={true} />} */}
    </>
  );
};

export default Gallery;
