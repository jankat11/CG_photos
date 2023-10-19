export interface FavoryItem {
  id: string | undefined
  urlSmall: string | undefined;
  urlLarge: string | undefined;
}

export interface Img {
  id: string;
  urls: { full: string; regular: string };
}

export interface UnsplashContextType {
  isDark: boolean;
  searchValue: string;
  favoryImages: FavoryItem[];
  isMyGalleryOpen: boolean;
  galleryPage: number;
  imagesData: any
  nextGalleryPage: () => void;
  addGallery: (item: FavoryItem) => void;
  removeGallery: (id: string) => void;
  openGallery: () => void;
  closeGallery: () => void;
  toggleTheme: () => void;
  handleChangeSearchvalue: (value: string) => void;
  setImagesData: () => void
}  

