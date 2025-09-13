// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// initialState يمكن تركه [] أو جلب من localStorage عند start إذا حبيت
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload || [];
      // sync to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      // dispatch custom event so Nav updates in same tab
      window.dispatchEvent(new Event("cartUpdated"));
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.qty = (existing.qty || 0) + (product.qty || 1);
      } else {
        state.items.push({ ...product, qty: product.qty || 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      window.dispatchEvent(new Event("cartUpdated"));
    },
    increment: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = (item.qty || 0) + 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      window.dispatchEvent(new Event("cartUpdated"));
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if ((item.qty || 0) > 1) item.qty -= 1;
        else {
          // remove if qty would go to 0
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      window.dispatchEvent(new Event("cartUpdated"));
    },
    remove: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      window.dispatchEvent(new Event("cartUpdated"));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      window.dispatchEvent(new Event("cartUpdated"));
    },
  },
});

export const { addToCart, increment, decrement, remove, setCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
