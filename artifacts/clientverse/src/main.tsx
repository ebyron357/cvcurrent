import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/cv-ui.css";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
