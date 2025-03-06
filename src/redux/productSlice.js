import { createSlice } from "@reduxjs/toolkit";
import Products from "../components/Products";

const productSlice=createSlice({
    name:'product',
    initialState:{products:[]},
    reducers:{
        SET_PRODUCTS_TO_VIEW(state,action){
        //   console.log(action.payload);
        state.products=action.payload;
        },
       
    }
})

export default productSlice;
export const {SET_PRODUCTS_TO_VIEW,}=productSlice.actions;
export const selectProduct=state=>state.product.products;