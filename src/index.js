import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";

// Setup Axios once here
axios.defaults.headers = { Accept: "application/json" };
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
export default axiosInstance;

// Find all widget divs
const widgetDivs = document.querySelectorAll(".xiclo-widget");

// Inject our React App into each class
widgetDivs.forEach((div) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        apikey={div.dataset.apikey}
        email={div.dataset.email}
        phone={div.dataset.phone}
        userid={div.dataset.userid}
      />
    </React.StrictMode>,
    div
  );
});
