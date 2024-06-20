// src/redux/actions/cartActions.js
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_CART = "CLEAR_CART";

// src/redux/actions/cartActions.js
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeItem = (itemId) => ({
  type: REMOVE_ITEM,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
