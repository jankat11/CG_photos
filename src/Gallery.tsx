import { useQuery } from "@tanstack/react-query";
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

  const fetchImages = useCallback(async () => {
    const urlParameters = `page=${page}&query=${
      searchValue ? searchValue : "cat"
    }`;
    const { data } = await axios.get(url + urlParameters, config);
    return data;
  }, [searchValue, page]);

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["photos", page, searchValue],
    queryFn: () => fetchImages(),
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log(page);
  }, [page, searchValue]);

    console.log(data, isPreviousData);

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
      <Button disabled={page === 1} onClick={prevPage}>
        prev
      </Button>
      <Button
        disabled={page === data.total_pages}
        onClick={nextPage.bind(null, data.total_pages)}
      >
        next
      </Button>
      {!isLoading &&
        (parseInt(data.total) !== 0 ? (
          <section className="image-container">
            {data.results.map(
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
            )}
          </section>
        ) : (
          <h1 className="text-center my-5">no results</h1>
        ))}
    </>
  );
};

export default Gallery;
