import { createContext, useState } from "react";

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
  const [isDark, setIsDark] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const toggleTheme = () => setIsDark((prev) => !prev);
  const handleChangeSearchvalue = (value: string) => {
    setSearchValue(value);
  };

  const contextValue: UnsplashContextType = {
    isDark,
    searchValue,
    toggleTheme,
    handleChangeSearchvalue,
  };

  return (
    <UnsplashContext.Provider value={contextValue}>
      {children}
    </UnsplashContext.Provider>
  );
};

export default UnsplashContext;
