import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useEffect, useContext } from "react";
import UnsplashContext from "./appContext";
import {Image} from "react-bootstrap"
import photo1 from "./assets/photo1.svg"



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
      <Image width={350} className="ms-1 position-absolute icon-img"  src={photo1}  fluid/>
      <h3 style={{color: isDark ? "white" : "#4a044e"}} className="title jankat mt-1 position-relative">
        Jankat <span className="mx-1">Images</span>
      </h3>
      <p
        style={{ color: !isDark ? "#4a044e" : "#e2e8f0" }}
        onClick={handleGallery}
        className="gallery-title"
      >
        <span style={{ textDecoration: "underline" }}>
          {!isMyGalleryOpen ? "Gallery" : "home"}
        </span>
      </p>
      <div className="toggle-icon">
        <div onClick={toggleTheme} className="dark-toggle">
          {!isDark ? (
            <BsFillSunFill style={{ color: !isDark ? "#4a044e" : "#e2e8f0" }} />
          ) : (
            <BsFillMoonFill />
          )}
        </div>
      </div>
    </section>
  );
};
export default Header;
