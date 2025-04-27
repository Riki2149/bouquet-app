import { createSlice } from "@reduxjs/toolkit";

const cart = localStorage.getItem("cart");
const total = localStorage.getItem("total");

const initialState = {
    arrCart: cart ? JSON.parse(cart) : [],
    totalPrice: total ? JSON.parse(total).totalPrice : 0,
    totalItems: total ? JSON.parse(total).totalItems : 0
};

const updateLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state.arrCart));
    localStorage.setItem("total", JSON.stringify({
        totalItems: state.totalItems,
        totalPrice: state.totalPrice
    }));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arrCart.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.arrCart[index].qty++;
            } else {
                state.arrCart.push({ ...action.payload, qty: 1 });
            }
            state.totalPrice += action.payload.price;
            state.totalItems += 1;
            updateLocalStorage(state);
        },
        deleteOneFromCart: (state, action) => {
            let index = state.arrCart.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                if (state.arrCart[index].qty > 1) {
                    state.arrCart[index].qty--;
                    state.totalPrice -= action.payload.price;
                    state.totalItems -= 1;
                } else {
                    state.totalPrice -= state.arrCart[index].price;
                    state.totalItems -= state.arrCart[index].qty;
                    state.arrCart.splice(index, 1);
                }
                updateLocalStorage(state);
            }
        },
        removeFromCart: (state, action) => {
            let index = state.arrCart.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.totalPrice -= state.arrCart[index].price * state.arrCart[index].qty;
                state.totalItems -= state.arrCart[index].qty;
                state.arrCart.splice(index, 1);
                updateLocalStorage(state);
            }
        },
        removeAllCart: (state) => {
            state.arrCart = [];
            state.totalPrice = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
        }
    }
});

export const { addToCart, deleteOneFromCart, removeFromCart, removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;
