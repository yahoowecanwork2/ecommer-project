import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subtotal: 0,
  },

  reducers: {
    // add or increase item quantity if exist 
    // store [0] imeg orl 
    addOrIncrementInCart: (state, action) => {
      const { productId,price,slug,name,description,imageUrl} = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({productId,slug,price, name,description,imageUrl, quantity: 1 });
      }
      state.subtotal = state.items.reduce(
  (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
  0
);
    },
 
    // decrease quantity if exist if not exist remove item 
    decrementOrRemoveInCart: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.productId !== productId);
      }
      state.subtotal = state.items.reduce(
  (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
  0
);
    },

    removeItemInCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.productId !== productId);

      state.subtotal = state.items.reduce(
  (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
  0
);
    },

    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { addOrIncrementInCart, decrementOrRemoveInCart, removeItemInCart, clearCart } =
  cartSlice.actions;
