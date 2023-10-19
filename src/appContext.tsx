import { createContext, useState, useEffect } from "react";
import { UnsplashContextType, FavoryItem } from "./app.modal";

const favoryImagePerPage = 12;
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

const UnsplashContext = createContext<UnsplashContextType>({
  isDark: false,
  touch: false,
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
  setTouchTrue: () => {},
  setTouchFalse: () => {}
});

interface Props {
  children: React.ReactNode;
}

export const UnsplashContextProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(initialTheme);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMyGalleryOpen, setIsMyGalleryOpen] = useState<boolean>(false);
  const [galleryPage, setGalleryPage] = useState<number>(favoryImagePerPage);
  const [touch, setTouch] = useState<boolean>(false);
  const [favoryImages, setFavoryImages] =
    useState<FavoryItem[]>(initialGallery);
  const handleChangeSearchvalue = (value: string) => {
    setSearchValue(value);
  };

  const addGallery = (imgItem: FavoryItem) => {
    setFavoryImages((prev) => [imgItem, ...prev]);
  };

  const setTouchTrue = () => {
    setTouch(true)
  }
  const setTouchFalse = () => {
    setTouch(false)
  }

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
    console.log("gallery page is: ", galleryPage);

    setGalleryPage((prev) => {
      if (favoryImages.length > prev) return prev + favoryImagePerPage;
      return prev;
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
    touch,
    galleryPage,
    nextGalleryPage,
    addGallery,
    removeGallery,
    openGallery,
    closeGallery,
    toggleTheme,
    handleChangeSearchvalue,
    setTouchTrue,
    setTouchFalse
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
