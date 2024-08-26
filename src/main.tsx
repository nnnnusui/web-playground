import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import { App } from "./App";

console.log("loaded[src/main.tsx]");
const root = document.getElementById("root");
if (!root) throw new Error("#root not found.");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
