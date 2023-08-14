import { useContext, useEffect, useRef } from "react";
import UnsplashContext from "./appContext";
import { HiPhoto } from 'react-icons/hi2';
let timeOut: number;



const SearchForm = () => {
  const {
    handleChangeSearchvalue,
    openGallery,
    closeGallery,
    isMyGalleryOpen,
    isDark,
  } = useContext(UnsplashContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      handleChangeSearchvalue(inputRef.current!.value);
      closeGallery();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isMyGalleryOpen) inputRef.current!.value = "";
  }, [isMyGalleryOpen]);

  return (
    <section>
      <p style={{color:  "white"}} onClick={openGallery} className="gallery-title">
        <span style={{textDecoration: "underline"}}>Gallery</span> <HiPhoto/>
      </p>
      <h1 className="title jankat">Jankat <span className="mx-1">Images</span></h1>
      <article>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            placeholder={!isMyGalleryOpen ? "setup" : "your gallery:"}
            type="text"
            ref={inputRef}
            onChange={handleChange}
            className="form-input search-input"
          />
        </form>
      </article>
    </section>
  );
};
export default SearchForm;
