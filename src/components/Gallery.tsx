import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useCallback, useState } from "react";
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
  const fetchImages = useCallback(
    async (pageParam: number) => {
      const urlParameters = `?per_page=18&page=${pageParam}&query=${
        searchValue ? searchValue : "beautiful"
      }`;
      const { data } = await axios.get(url + urlParameters);
      setTouchFalse()
      return data;
    },
    [searchValue]
  );

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["photos", searchValue],
      queryFn: ({ pageParam = 1 }) => fetchImages(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.total_pages > allPages.length) {
          return allPages.length + 1;
        }
      },
    });

  const handleFetch = () => {
    fetchNextPage()
  }

  const handleScroll = () => {
    if (
      !touch &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 600
    ) {
      if (!isMyGalleryOpen) {
        setTouchTrue();
        handleFetch()
    

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
        (parseInt(data?.pages[0].total) !== 0 ? (
          <section className="image-container">
            {data?.pages.map((pageItem) => {
              return pageItem.results.map((img: Img) => {
                return <ImageItem key={img.id} isGallery={false} image={img} />;
              });
            })}
          </section>
        ) : (
          <EmptyInfo result={true} />
        ))}
      {isFetchingNextPage && <Spinner bottomSpiner={true} />}
    </>
  );
};

export default Gallery;
