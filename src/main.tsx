import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// import { AppDataProvider } from "./AppDataContext";
import { DemoAppDataProvider } from "./DemoDataContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoAppDataProvider>
      <App />
    </DemoAppDataProvider>
  </StrictMode>
);
