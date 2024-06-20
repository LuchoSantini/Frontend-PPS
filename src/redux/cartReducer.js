// src/redux/reducers/cartReducer.js

import { ADD_TO_CART, REMOVE_ITEM, CLEAR_CART } from "./cartActions";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, colorId, sizeId } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id && item.colorId === colorId && item.sizeId === sizeId
      );

      if (existingItem) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        const updatedItems = state.items.map((item) =>
          item.id === id && item.colorId === colorId && item.sizeId === sizeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad inicial 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case REMOVE_ITEM:
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id &&
          item.colorId === action.payload.colorId &&
          item.sizeId === action.payload.sizeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
