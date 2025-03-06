import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:'order',
    initialState:{myOrders:[]},
    reducers:{
        SET_MY_ORDERS(state,action){
            state.myOrders=action.payload;
        }
    }
})

export default orderSlice;
export const {SET_MY_ORDERS}=orderSlice.actions;
export const selectMyOrders=state=>state.order.myOrders;