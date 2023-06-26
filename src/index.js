import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { combineReducers, createStore } from "@reduxjs/toolkit";

const popupReducer = combineReducers({
  showHide: (state = { modal: false }, action) => {
    switch (action.type) {
      case "SHOW_POPUP":
        return { modal: true };
      case "HIDE_MODAL":
        return { modal: false };
      default:
        return state;
    }
  },
});

const initialState = {
  isAuthenticated: false,
  user: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const popupStore = createStore(popupReducer);
const loginStore = createStore(loginReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={loginStore}>
      <Provider store={popupStore}>
        <App />
      </Provider>
    </Provider>
  </React.StrictMode>
);
