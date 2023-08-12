import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://api.unsplash.com/search/photos?page=1&query=cat";
const config: { headers: { Authorization: string } } = {
  headers: {
    Authorization: "Client-ID CrA0NtMilXfHO8gGSt_gVXw1QN9-0Np011M6Stq-F0s",
  },
};

const Gallery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const { data } = await axios.get(url, config);
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
            <img
              className="img"
              key={img.id}
              src={img.urls.regular}
              alt="none"
            />
          );
        })}
    </section>
  );
};

export default Gallery;
