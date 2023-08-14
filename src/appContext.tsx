import { createContext, useState } from "react";

type changeEvent = React.ChangeEvent<HTMLInputElement>;

interface props {
  children: React.ReactNode;
}

interface UnsplashContextType {
  isDark: boolean;
  inputValue: string;
  searchValue: string;
  toggleTheme: () => void;
  handleChangeSearchvalue: (e: changeEvent) => void;
  handleSubmit: (input: string) => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  inputValue: "",
  searchValue: "",
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
  handleSubmit: () => {},
});

export const UnsplashContextProvider: React.FC<props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const toggleTheme = () => setIsDark((prev) => !prev);
  const handleChangeSearchvalue = (e: changeEvent) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (input: string) => {
    setSearchValue(input);
  };

  const contextValue: UnsplashContextType = {
    isDark,
    inputValue,
    searchValue,
    handleSubmit,
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
