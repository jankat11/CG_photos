import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const body = document.querySelector<HTMLBodyElement>("body")!;
    body.classList.toggle("dark-theme", isDark);
  }, [isDark])

  return (
    <section className="toggle-container">
      <div className="toggle-icon">
        <div onClick={handleToggle} className="dark-toggle">
          {!isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
        </div>
      </div>
    </section>
  );
};
export default ThemeToggle;
