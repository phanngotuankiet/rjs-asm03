import { createStore } from "redux";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("currentUser", JSON.stringify(action.user));

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
    case "WRONGPASSWORD":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const store = createStore(loginReducer);

export default store;
