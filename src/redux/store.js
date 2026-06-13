import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import productSlice from "./productSlice";
import checkoutSlice from "./checkoutSLice";
import orderSlice from "./orderSlice";
import favSlice from "./favSlice";
import { loadState, saveState } from './persistence';

const store=configureStore({
    preloadedState: loadState(),
    reducer:{
        cart:cartSlice.reducer,
        filter:filterSlice.reducer,
        product:productSlice.reducer,
        checkout:checkoutSlice.reducer,
        order:orderSlice.reducer,
        fav:favSlice.reducer,
    }
})

store.subscribe(() => saveState(store.getState()));

export default store
