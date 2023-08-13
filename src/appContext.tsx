import { createContext, useState } from "react";

type changeEvent = React.ChangeEvent<HTMLInputElement>;

interface props {
  children: React.ReactNode;
}

interface UnsplashContextType {
  isDark: boolean;
  inputValue: string;
  searchValue: string;
  page: number;
  toggleTheme: () => void;
  prevPage: () => void;
  nextPage: (maxPage: string) => void;
  resetPage: () => void;
  handleChangeSearchvalue: (e: changeEvent) => void;
  handleSubmit: (input: string) => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  inputValue: "",
  searchValue: "",
  page: 1,
  resetPage: () => {},
  prevPage: () => {},
  nextPage: () => {},
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
  handleSubmit: () => {},
});

export const UnsplashContextProvider: React.FC<props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const handleChangeSearchvalue = (e: changeEvent) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (input: string) => {
    setSearchValue(input);
  };

  const nextPage = (maxPage: string) => {
    const max = parseInt(maxPage)
    setPage((prev) =>  Math.min(prev + 1, max));
  };
  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const resetPage = () => {
    setPage(1);
  };

  const contextValue: UnsplashContextType = {
    isDark,
    inputValue,
    searchValue,
    page,
    handleSubmit,
    toggleTheme,
    handleChangeSearchvalue,
    prevPage,
    nextPage,
    resetPage,
  };

  return (
    <UnsplashContext.Provider value={contextValue}>
      {children}
    </UnsplashContext.Provider>
  );
};

export default UnsplashContext;
