import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useCallback } from "react";
import UnsplashContext from "../appContext";
import Spinner from "./Spinner";
import ImageItem from "./ImageItem";
import { FavoryItem, Img } from "../app.modal";
import EmptyInfo from "./EmptyInfo";

const url: string = import.meta.env.VITE_BASE_URL;
const config: { headers: { Authorization: string } } = {
  headers: {
    Authorization: import.meta.env.VITE_ACCESS_TOKEN,
  },
};

const Gallery = () => {
  const {
    searchValue,
    isMyGalleryOpen,
    favoryImages,
    galleryPage,
    nextGalleryPage,
  } = useContext(UnsplashContext);

  const fetchImages = useCallback(
    async (pageParam: number) => {
      const urlParameters = `per_page=18&page=${pageParam}&query=${
        searchValue ? searchValue : "desk"
      }`;
      const { data } = await axios.get(url + urlParameters, config);
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

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 600
    ) {
      if (!isMyGalleryOpen) {
        fetchNextPage();
      } else {
        console.log(favoryImages.length, galleryPage);

        if (favoryImages.length > galleryPage) nextGalleryPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMyGalleryOpen, galleryPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isMyGalleryOpen) {
    return (
      <>
        {favoryImages.length !== 0 ? (
          <section className="image-container">
            {favoryImages.slice(0, galleryPage).map((item: FavoryItem) => {
              return <ImageItem key={item.id} isGallery={true} favory={item} />;
            })}
          </section>
        ) : (
          <EmptyInfo result={false} />
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
