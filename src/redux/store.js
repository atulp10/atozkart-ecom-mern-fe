import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import productSlice from "./productSlice";
import checkoutSlice from "./checkoutSLice";
import orderSlice from "./orderSlice";
import favSlice from "./favSlice";

const store=configureStore({
    reducer:{
        cart:cartSlice.reducer,
        filter:filterSlice.reducer,
        product:productSlice.reducer,
        checkout:checkoutSlice.reducer,
        order:orderSlice.reducer,
        fav:favSlice.reducer,
    }
})

export default store