import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{details:null},
    reducers:{
        SET_DETAILS(state,action){
            state.details=action.payload;
        },
        CLEAR_DETAILS(state){
            state.details=null;
        }
    }
})

export default checkoutSlice;
export const {SET_DETAILS,CLEAR_DETAILS}=checkoutSlice.actions;
export const selectDetails=state=>state.checkout.details;
