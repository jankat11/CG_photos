import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import UnsplashContext from "./appContext";

const url = "https://api.unsplash.com/search/photos?page=1&query=";
const config: { headers: { Authorization: string } } = {
  headers: {
    Authorization: "Client-ID CrA0NtMilXfHO8gGSt_gVXw1QN9-0Np011M6Stq-F0s",
  },
};

const Gallery = () => {
  const { searchValue } = useContext(UnsplashContext);

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
      <>
        <h1>LOADING</h1>
      </>
    );
  }

  return (
    <section className="image-container">
      {!isLoading &&
        data.results.map((img: { id: string; urls: { regular: string } }) => {
          return (
            <a key={img.id} href={img.urls.regular} target="_blank">
              <img className="img" src={img.urls.regular} alt="none" />
            </a>
          );
        })}
    </section>
  );
};

export default Gallery;
