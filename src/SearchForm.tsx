


const SearchForm = () => {

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <article>
        <form className="search-form">
          <input
            placeholder="cat"
            type="text"
            className="form-input search-input"
          />
          <button className="btn">Search</button>
        </form>
      </article>
    </section>
  );
};
export default SearchForm;
