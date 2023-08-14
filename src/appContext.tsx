import { createContext, useState, useEffect } from "react";

const theme = localStorage.getItem("isDark");
const initialTheme = theme ? (theme === "false" ? false : true) : false;

interface props {
  children: React.ReactNode;
}

interface UnsplashContextType {
  isDark: boolean;
  searchValue: string;
  toggleTheme: () => void;
  handleChangeSearchvalue: (value: string) => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  searchValue: "",
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
});

export const UnsplashContextProvider: React.FC<props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(initialTheme);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleChangeSearchvalue = (value: string) => {
    setSearchValue(value);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDark", newTheme.toString());
    setIsDark((prev) => !prev);
  };
  const contextValue: UnsplashContextType = {
    isDark,
    searchValue,
    toggleTheme,
    handleChangeSearchvalue,
  };

  useEffect(() => {
    if (!theme) localStorage.setItem("isDark", "false");
    const newTheme = localStorage.getItem("isDark") === "false" ? false : true;
    setIsDark(newTheme);
  }, []);

  return (
    <UnsplashContext.Provider value={contextValue}>
      {children}
    </UnsplashContext.Provider>
  );
};

export default UnsplashContext;
