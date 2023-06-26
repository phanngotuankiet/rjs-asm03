import { createStore } from "redux";

const initialState = {
  isOpen: false,
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      return {
        ...state,
        isOpen: true,
      };
    case "HIDE_POPUP":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

const store = createStore(popupReducer);

export default store;
