import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
// antd css
import "antd/dist/antd.css";
// react slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import i18n (chuyển đổi đa ngôn ngữ)
import "./i18n";
// animate
import "animate.css";
// animation scroll
import "animate.css/animate.min.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
