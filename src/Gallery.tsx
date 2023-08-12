import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import UnsplashContext from "./appContext";
import Spinner from "react-bootstrap/Spinner";

const url :string = import.meta.env.VITE_BASE_URL;
const config: { headers: { Authorization: string } } = {
  headers: {
    Authorization: import.meta.env.VITE_ACCESS_TOKEN,
  },
};

const Gallery = () => {
  const { searchValue, isDark } = useContext(UnsplashContext);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  const { data, isLoading } = useQuery({
    queryKey: ["photos", searchValue],
    queryFn: async () => {
      const { data } = await axios.get(
        url + (searchValue ? searchValue : "cat"),
        config
      );
      return data;
    },
  });

  console.log(data);

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
    <div>
      {!isLoading &&
        (parseInt(data.total) !== 0 ? (
          <section className="image-container">
            {data.results.map(
              (img: { id: string; urls: { regular: string } }) => {
                return (
                  <a key={img.id} href={img.urls.regular} target="_blank">
                    <img className="img" src={img.urls.regular} alt="none" />
                  </a>
                );
              }
            )}
          </section>
        ) : (
          <h1 className="text-center my-5">no results</h1>
        ))}
    </div>
  );
};

export default Gallery;
