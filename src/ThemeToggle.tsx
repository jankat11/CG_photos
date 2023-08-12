import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useEffect, useContext } from "react";
import UnsplashContext from "./appContext";

const ThemeToggle = () => {
  const {isDark, toggleTheme} = useContext(UnsplashContext)

  useEffect(() => {
    const body = document.querySelector<HTMLBodyElement>("body")!;
    body.classList.toggle("dark-theme", isDark);
  }, [isDark])

  return (
    <section className="toggle-container">
      <div className="toggle-icon">
        <div onClick={toggleTheme} className="dark-toggle">
          {!isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
        </div>
      </div>
    </section>
  );
};
export default ThemeToggle;
