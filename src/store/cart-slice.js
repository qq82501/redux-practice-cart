import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
  cartQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    fetchData(state, action) {
      state.cartItems = action.payload.cartItems;
      state.cartQuantity = action.payload.cartQuantity;
    },
    addCartItem(state, action) {
      const { newItem } = action.payload;
      const cartItems = state.cartItems;
      const [exsitedItem] = cartItems.filter(
        (item) => item.title === newItem.title
      );
      if (!exsitedItem) state.cartItems.push(newItem);
      if (exsitedItem) exsitedItem.quantity += newItem.quantity;
      state.cartQuantity++;
      state.changed = true;
    },
    removeCartItem(state, action) {
      const removeTitle = action.payload;
      const cartItems = state.cartItems;
      const [existedItem] = cartItems.filter(
        (item) => item.title === removeTitle
      );
      if (existedItem.quantity === 1)
        state.cartItems = cartItems.filter(
          (item) => item.title !== removeTitle
        );
      if (existedItem.quantity > 1) existedItem.quantity--;
      if (!state.cartQuantity) return;
      state.cartQuantity--;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
