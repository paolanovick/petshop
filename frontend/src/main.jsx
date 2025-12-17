import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // 👈 ESTA LÍNEA ES CLAVE

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
