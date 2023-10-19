import { createContext, useState, useEffect } from "react";
import { UnsplashContextType, FavoryItem, ApiResponse } from "./app.modal";

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
  searchValue: "",
  favoryImages: [],
  isMyGalleryOpen: false,
  galleryPage: 0,
  imagesData: null,
  nextGalleryPage: () => {},
  addGallery: () => {},
  removeGallery: () => {},
  openGallery: () => {},
  closeGallery: () => {},
  toggleTheme: () => {},
  handleChangeSearchvalue: () => {},
  setImagesData: () => {}
});

interface Props {
  children: React.ReactNode;
}

let timeOut: number;

export const UnsplashContextProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(initialTheme);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMyGalleryOpen, setIsMyGalleryOpen] = useState<boolean>(false);
  const [galleryPage, setGalleryPage] = useState<number>(favoryImagePerPage);
  const [imagesData, setImages] = useState<ApiResponse | null>(null);
  const [favoryImages, setFavoryImages] =
    useState<FavoryItem[]>(initialGallery);


  const handleChangeSearchvalue = (value: string) => {
    
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setImages(null)
      setSearchValue(value);
      closeGallery();
    }, 600);
  };

  const setImagesData = (data: ApiResponse) => {
    setImages((prev) => {
      if (prev) {
        return {
          total: data.total,
          total_pages: data.total_pages,
          results: [...prev.results, ...data.results],
        };
      } else {
        if (searchValue) {
          console.log("from set: ", data);
          return data;
        } else {
          return {
            total: data.total,
            total_pages: data.total_pages,
            results: [...data.results.slice(1)],
          }
        }
      }
    });
  }

  const addGallery = (imgItem: FavoryItem) => {
    setFavoryImages((prev) => [imgItem, ...prev]);
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
    galleryPage,
    imagesData,
    nextGalleryPage,
    addGallery,
    removeGallery,
    openGallery,
    closeGallery,
    toggleTheme,
    handleChangeSearchvalue,
    setImagesData
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
