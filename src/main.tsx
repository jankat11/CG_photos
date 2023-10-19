import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UnsplashContextProvider } from "./appContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UnsplashContextProvider>
    <App />
  </UnsplashContextProvider>
);
