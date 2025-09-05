import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./page/HomePage";
import "./app/styles/App.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HomePage />
	</StrictMode>
);
