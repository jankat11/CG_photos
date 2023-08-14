import Gallery from "./Gallery"
import SearchForm from "./SearchForm"
import ThemeToggle from "./ThemeToggle"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <header>
        <ThemeToggle />
        <SearchForm />
      </header>
      <Gallery />
    </>
  )
}
export default App
