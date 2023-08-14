import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useEffect, useContext } from "react";
import UnsplashContext from "./appContext";

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
      <p
        style={{ color: !isDark ? "#d946ef" : "white" }}
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
            <BsFillSunFill style={{ color: !isDark ? "#d946ef" : "white" }} />
          ) : (
            <BsFillMoonFill />
          )}
        </div>
      </div>
    </section>
  );
};
export default Header;
