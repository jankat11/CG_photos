import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UnsplashContextProvider } from "./appContext";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UnsplashContextProvider>
      <App />
    </UnsplashContextProvider>
  </QueryClientProvider>
);
