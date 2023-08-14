import { createContext, useState } from "react";

const theme = localStorage.getItem("isDark");
const initialTheme = theme ? (theme === "false" ? false : true) : false;
if (!theme) localStorage.setItem("isDark", "false");

interface FavoryItem {
  id : string;
  urlSmall: string;
  urlLarge: string; 
}

interface UnsplashContextType {
  isDark: boolean;
  searchValue: string;
  favoryImages: FavoryItem[];
  addGallery: (item: FavoryItem) => void;
  removeGallery: (id: string) => void;
  toggleTheme: () => void;
  handleChangeSearchvalue: (value: string) => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  searchValue: "",
  favoryImages: [],
  addGallery: () => {},
  removeGallery: () => {},
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const UnsplashContextProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(initialTheme);
  const [searchValue, setSearchValue] = useState<string>("");
  const [favoryImages, setFavoryImages] = useState<FavoryItem[]>([])
  const handleChangeSearchvalue = (value: string) => {
    setSearchValue(value);
  };

  const addGallery = (imgItem : FavoryItem) => {
    setFavoryImages(prev => [...prev, imgItem])
  }
  
  const removeGallery = (imgId : string) => {
    setFavoryImages(prev => {
      return prev.filter((item) => {
        return item.id !== imgId
      })
    })
  }

  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDark", newTheme.toString());
    setIsDark((prev) => !prev);
  };
  const contextValue: UnsplashContextType = {
    isDark,
    searchValue,
    favoryImages,
    addGallery,
    removeGallery,
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
