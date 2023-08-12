import Gallery from "./Gallery"
import SearchForm from "./SearchForm"
import ThemeToggle from "./ThemeToggle"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {


  return (
    <>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </>
  )
}
export default App