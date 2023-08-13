import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useCallback } from "react";
import UnsplashContext from "./appContext";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";

const url: string = import.meta.env.VITE_BASE_URL;
const config: { headers: { Authorization: string } } = {
  headers: {
    Authorization: import.meta.env.VITE_ACCESS_TOKEN,
  },
};

const Gallery = () => {
  const { searchValue, isDark, page, nextPage, prevPage } =
    useContext(UnsplashContext);

  const fetchImages = async (pageParam: number) => {
    const urlParameters = `page=${pageParam}&query=${
      searchValue ? searchValue : "cat"
    }`;
    const { data } = await axios.get(url + urlParameters, config);
    console.log("im fetching");

    return data;
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["photos", searchValue],
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam),
    getNextPageParam: () => page,
  });

  const handleNextPage = () => {
    nextPage("300");
    fetchNextPage();
  };

  useEffect(() => {
    console.log("hell");
  }, [page, searchValue]);

  console.log("pageıtem is ", data?.pages);
  console.log("total page is", data?.pages[0].total_pages);

  /*    staleTime: 500000000,
     keepPreviousData: true,
     cacheTime: 300000000,
     enabled: true, */

  /* const loadMore = () => {
      if (data && data.total_pages > page && !isLoading && !isFetching) {
        nextPage(data.total_pages);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    }; */

  if (isLoading) {
    return (
      <div className="spinner-container w-100 d-flex justify-content-center my-5">
        <Spinner
          style={{ color: isDark ? "#f0f0f0" : "#645cff" }}
          className="spinner"
          animation="grow"
        />
      </div>
    );
  }

  return (
    <>
      <div className="position-absolute" style={{ top: "2rem" }}>
        <Button
          disabled={page === data?.pages[0].total_pages}
          onClick={handleNextPage}
        >
          next
        </Button>
      </div>
      {!isLoading &&
        (parseInt(data?.pages[0].total) !== 0 ? (
          <section className="image-container">
            {data?.pages.map((pageItem) => {
              return pageItem.results.map(
                (img: {
                  id: string;
                  urls: { full: string; regular: string };
                }) => {
                  return (
                    <a key={img.id} href={img.urls.full} target="_blank">
                      <img className="img" src={img.urls.regular} alt="none" />
                    </a>
                  );
                }
              );
            })}
          </section>
        ) : (
          <h1 className="text-center my-5">no results</h1>
        ))}
    </>
  );
};

export default Gallery;
