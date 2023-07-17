import React from "react";
import ReactDOM from "react-dom/client";

import { UserContextProvider } from "./contexts/UserContext";
import App from "./App";
import "./index.css";
import CustomRouter from "./components/routes/CustomRouter";
import customHistory from "./services/history";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CustomRouter history={customHistory}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </CustomRouter>
);
