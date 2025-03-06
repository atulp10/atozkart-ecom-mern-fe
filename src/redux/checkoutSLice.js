import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{details:[]},
    reducers:{
        SET_DETAILS(state,action){
            state.details=action.payload;
        }
    }
})

export default checkoutSlice;
export const {SET_DETAILS}=checkoutSlice.actions;
export const selectDetails=state=>state.checkout.details;