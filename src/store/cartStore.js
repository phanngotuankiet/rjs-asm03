import { createStore } from "redux";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (product) => product._id.$oid !== action.payload._id.$oid
      );

      console.log(updatedCart);
      // trả dữ liệu về cho redux store xong rồi thì đặt chúng vào lại localstorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: action.payload.quantity,
            };
          }
          return product;
        }),
      };

    // delete cart whenever i want
    case "RESET_CART":
      return state;

    default:
      return state;
  }
};

const store = createStore(cartReducer);

export default store;
