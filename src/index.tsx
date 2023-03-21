import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/css/index.min.css";
import NavContextProvider from "./context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <NavContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </NavContextProvider>
);
