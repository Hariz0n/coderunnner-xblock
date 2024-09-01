import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "@/pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RuntimeContextProvider } from "@/entities/Runtime";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RuntimeContextProvider>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </RuntimeContextProvider>
  </StrictMode>
);
