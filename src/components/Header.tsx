import { RiLightbulbFill } from "react-icons/ri";
import { MdNightlightRound } from "react-icons/md";
import { IoIosPhotos } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useContext } from "react";
import UnsplashContext from "../appContext";
import { Image } from "react-bootstrap";
import photo1 from "../assets/photo1.svg";

const Header = () => {
  const { isDark, isMyGalleryOpen, toggleTheme, openGallery, closeGallery } =
    useContext(UnsplashContext);

  const handleGallery = () => {
    if (!isMyGalleryOpen) {
      openGallery();
    } else {
      closeGallery();
    }
  };

  useEffect(() => {
    const body = document.querySelector<HTMLBodyElement>("body")!;
    body.classList.toggle("dark-theme", isDark);
  }, [isDark]);

  return (
    <section className="toggle-container">
      <Image
        width={350}
        className="ms-1 position-absolute icon-img"
        src={photo1}
        fluid
      />
      <h3
        style={{ color: isDark ? "white" : "#4a044e", cursor: "default" }}
        className="title jankat mt-1 position-relative"
      >
        Cankat <span className="mx-1">Photos</span>
      </h3>
      <article className="d-flex">
        <p
          style={{ color: !isDark ? "#4a044e" : "#e2e8f0" }}
          onClick={handleGallery}
          className="gallery-title"
        >
          <span>
            {!isMyGalleryOpen ? (
              <span>
                <IoIosPhotos className="me-1" />
                gallery
              </span>
            ) : (
              <span>
                <GoHomeFill className="home-icon" /> home
              </span>
            )}
          </span>
        </p>
        <div className="toggle-icon">
          <div onClick={toggleTheme} className="dark-toggle">
            {!isDark ? (
              <RiLightbulbFill
                style={{ color: !isDark ? "#4a044e" : "#e2e8f0" }}
              />
            ) : (
              <MdNightlightRound />
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
export default Header;
