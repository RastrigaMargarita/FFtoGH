import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";

import "./scss/app.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);
