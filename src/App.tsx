import Gallery from "./components/Gallery";
import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </>
  );
};
export default App;
