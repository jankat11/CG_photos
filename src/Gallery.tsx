import { useQuery } from "@tanstack/react-query";
import { nanoid } from 'nanoid'

const data = [
  "/images/ss-1.png",
  "/images/ss-2.png",
  "/images/ss-3.png",
  "/images/ss-4.png",
  "/images/ss-5.png",
  "/images/ss-6.png",
  "/images/ss-7.png",
  "/images/ss-8.png",
  "/images/ss-9.png",
  "/images/ss-10.png",
];

const Gallery = () => {



  return (
    <section className="image-container">
      {data.map((img) => {
        const id = nanoid()
        return <img className="img" key={id} src={img} alt="none" />;
      })}
    </section>
  );
};

export default Gallery;
