import { useContext, useEffect, useRef } from "react";
import UnsplashContext from "../appContext";

let timeOut: number;

const SearchForm = () => {
  const {
    handleChangeSearchvalue,
    isMyGalleryOpen,
    searchValue,
  } = useContext(UnsplashContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    handleChangeSearchvalue(inputRef.current!.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isMyGalleryOpen) {
      inputRef.current!.value = "";
    } else {
      inputRef.current!.value = searchValue;
    }
  }, [isMyGalleryOpen]);

  return (
    <section>
      <article>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            placeholder={!isMyGalleryOpen ? "search" : "your gallery:"}
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
