import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader.tsx";
// import { Dots } from "react-preloaders";
//<Dots background="#17181c" color="var(--white)" time={2500} />

import { BrowserRouter } from "react-router-dom";
import { Router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Preloader />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />

    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
