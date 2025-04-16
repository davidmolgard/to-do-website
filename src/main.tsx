import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppDataProvider } from "./AppDataContext";
import { apptData, goalData, habitData, taskData } from "./DummyData";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppDataProvider
      children={<App />}
      habits={habitData}
      tasks={taskData}
      appointments={apptData}
      goals={goalData}
      >
    </AppDataProvider>
  </StrictMode>
);
