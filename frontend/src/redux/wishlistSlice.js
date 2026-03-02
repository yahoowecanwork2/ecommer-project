import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    subtotal: 0,
  },

  reducers: {
    // set wishlist items comes with api 
    setWishlistItems: (state, action) => {
      state.items = action.payload || [];

      state.subtotal = state.items.reduce(
        (acc, item) =>
          acc + Number(item.price || 0) * Number(item.quantity || 0),
        0
      );
    },
    addOrIncrementInWishlist: (state, action) => {
      const { productId,slug,price,name,description,imageUrl} = action.payload;
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
    decrementOrRemoveInWishlist: (state, action) => {
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

    removeItemInWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.productId !== productId);

      state.subtotal = state.items.reduce(
  (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
  0
);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { addOrIncrementInWishlist, decrementOrRemoveInWishlist, removeItemInWishlist,clearWishlist,setWishlistItems } =
  wishlistSlice.actions;
