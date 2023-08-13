import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UnsplashContextProvider } from "./appContext";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UnsplashContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </UnsplashContextProvider>
);
