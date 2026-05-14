import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryOperations } from "./common/api/httpClient.ts";
import { SnackbarProvider } from "notistack";
import { snackbarConfig } from "./common/configs/snackbar.config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryOperations}>
        <SnackbarProvider {...snackbarConfig}>
          <App />
        </SnackbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
