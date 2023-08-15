import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useCallback } from "react";
import UnsplashContext from "./appContext";
import Spinner from "react-bootstrap/Spinner";
import Heart from "./Heart";

interface Img {
  id: string;
  urls: { full: string; regular: string };
}

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
    isDark,
    nextGalleryPage,
  } = useContext(UnsplashContext);

  const fetchImages = useCallback(
    async (pageParam: number) => {
      const urlParameters = `per_page=18&page=${pageParam}&query=${
        searchValue ? searchValue : "setup"
      }`;
      const { data } = await axios.get(url + urlParameters, config);
      return data;
    },
    [searchValue]
  );

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
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
      document.body.offsetHeight - 400
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
    return (
      <div className="spinner-container w-100 d-flex justify-content-center my-5">
        <Spinner
          style={{ color: "#d946ef" }}
          className="spinner"
          animation="grow"
        />
      </div>
    );
  }

  if (isMyGalleryOpen) {
    return (
      <>
        {favoryImages.length !== 0 ? (
          <section className="image-container">
            {favoryImages.slice(0, galleryPage).map((item) => {
              return (
                <article key={item.id} className="position-relative">
                  <a href={item.urlLarge} target="_blank">
                    <img className="img" src={item.urlSmall} alt="none" />
                  </a>
                  <Heart
                    largeImg={item.urlLarge}
                    smallImg={item.urlSmall}
                    imgId={item.id}
                  />
                </article>
              );
            })}
          </section>
        ) : (
          <h4
            style={{ color: isDark ? "#e2e8f0" : "#4a044e" }}
            className="text-center my-5 w-100"
          >
            no images yet!
          </h4>
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
                return (
                  <article key={img.id} className="position-relative">
                    <a href={img.urls.full} target="_blank">
                      <img className="img" src={img.urls.regular} alt="none" />
                    </a>
                    <Heart
                      largeImg={img.urls.full}
                      smallImg={img.urls.regular}
                      imgId={img.id}
                    />
                  </article>
                );
              });
            })}
          </section>
        ) : (
          <h4
            style={{ color: isDark ? "#e2e8f0" : "#4a044e" }}
            className="text-center my-5"
          >
            no result!
          </h4>
        ))}
    </>
  );
};

export default Gallery;
