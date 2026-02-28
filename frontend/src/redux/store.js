import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice } from "./userSlice";
import { cartSlice } from "./cartSlice";
const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
