import { createContext, useState, useEffect } from "react";

const favoryImagePerPage = 12
const theme = localStorage.getItem("isDark");
const initialTheme = theme ? (theme === "false" ? false : true) : false;
if (!theme) localStorage.setItem("isDark", "false");
const gallery = localStorage.getItem("gallery");
let initialGallery: FavoryItem[];
if (gallery) {
  initialGallery = JSON.parse(gallery);
} else {
  initialGallery = [];
}

interface FavoryItem {
  id: string;
  urlSmall: string;
  urlLarge: string;
}

interface UnsplashContextType {
  isDark: boolean;
  searchValue: string;
  favoryImages: FavoryItem[];
  isMyGalleryOpen: boolean;
  galleryPage: number;
  nextGalleryPage: () => void;
  addGallery: (item: FavoryItem) => void;
  removeGallery: (id: string) => void;
  openGallery: () => void;
  closeGallery: () => void;
  toggleTheme: () => void;
  handleChangeSearchvalue: (value: string) => void;
}

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  searchValue: "",
  favoryImages: [],
  isMyGalleryOpen: false,
  galleryPage: 0,
  nextGalleryPage: () => {},
  addGallery: () => {},
  removeGallery: () => {},
  openGallery: () => {},
  closeGallery: () => {},
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const UnsplashContextProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(initialTheme);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMyGalleryOpen, setIsMyGalleryOpen] = useState<boolean>(false);
  const [galleryPage, setGalleryPage] = useState<number>(favoryImagePerPage);
  const [favoryImages, setFavoryImages] =
    useState<FavoryItem[]>(initialGallery);
  const handleChangeSearchvalue = (value: string) => {
    setSearchValue(value);
  };

  const addGallery = (imgItem: FavoryItem) => {
    setFavoryImages((prev) => [...prev, imgItem]);
  };

  const removeGallery = (imgId: string) => {
    setFavoryImages((prev) => {
      return prev.filter((item) => {
        return item.id !== imgId;
      });
    });
  };

  const openGallery = () => {
    setIsMyGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsMyGalleryOpen(false);
    setGalleryPage(favoryImagePerPage);
  };

  const nextGalleryPage = () => {
    console.log("gallery page is: ",galleryPage);
    
    setGalleryPage((prev) => {
      if (favoryImages.length > prev) return prev + favoryImagePerPage
      return prev
    });
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDark", newTheme.toString());
    setIsDark((prev) => !prev);
  };
  const contextValue: UnsplashContextType = {
    isDark,
    searchValue,
    favoryImages,
    isMyGalleryOpen,
    galleryPage,
    nextGalleryPage,
    addGallery,
    removeGallery,
    openGallery,
    closeGallery,
    toggleTheme,
    handleChangeSearchvalue,
  };

  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(favoryImages));
  }, [favoryImages]);

  return (
    <UnsplashContext.Provider value={contextValue}>
      {children}
    </UnsplashContext.Provider>
  );
};

export default UnsplashContext;
