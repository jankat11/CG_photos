import { useContext, useRef } from "react";
import UnsplashContext from "./appContext";
let timeOut: number;

const SearchForm = () => {
  const {  handleChangeSearchvalue } = useContext(UnsplashContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      handleChangeSearchvalue(inputRef.current!.value);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <article>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            placeholder="cat"
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
