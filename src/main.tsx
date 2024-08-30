import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./index.scss";

console.log("loaded[src/main.tsx]");
const root = document.getElementById("root");
if (!root) throw new Error("#root not found.");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
