import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart:(state, action)=>{
      const nextCartItems = state.products.filter(
        cartItem => cartItem._id !== action.payload._id
      )
        state.quantity -= 1;
        state.total -= action.payload.price * action.payload.quantity;
        state.products = nextCartItems;
        
        localStorage.setItem("products",JSON.stringify(state.products))

        toast.error(`${action.payload.name} removed from cart`,{
          position: "bottom-left",
        });
    }
  },
});

export const { addProduct, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
