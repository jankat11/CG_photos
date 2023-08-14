import { useContext, useRef } from "react";
import UnsplashContext from "./appContext";

const SearchForm = () => {
  const { handleSubmit} = useContext(UnsplashContext);
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleInputRefSubmit = (e : React.FormEvent) => {
    e.preventDefault()
   
    handleSubmit(inputRef.current!.value)
  }
  
  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <article>
        <form onSubmit={handleInputRefSubmit} className="search-form">
          <input
            placeholder="cat"
            type="text"
            ref={inputRef}
            className="form-input search-input"
          />
          <button className="btn">Search</button>
        </form>
      </article>
    </section>
  );
};
export default SearchForm;
