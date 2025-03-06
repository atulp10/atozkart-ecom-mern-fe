import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers: {
        ADD_TO_CART(state,action){
            // console.log('addtocart called');
            // console.log(action);
            let idx=state.cartItems.findIndex(item=>item._id===action.payload._id);
            if(idx===-1){
                state.cartItems.push({...action.payload,qty:1});
                toast.success('Added to cart');
            } 
            else  toast.info('Item already added');
            
            
        },
        CALCULATE_TOTAL(state,action){
            let t=0;
            for(let item of state.cartItems){
                t+=(item.price*item.qty)
            }
            state.total=t;
        },

        REMOVE_FROM_CART(state,action){
            state.cartItems= state.cartItems.filter(item=>item._id!==action.payload);
            
        },

        EMPTY_CART(state,action){
            state.cartItems=[]
        },
        INCREASE(state,action){
            let item=action.payload
            let idx=state.cartItems.findIndex(i=>i._id===item._id);
            if(idx!==-1){
                if(item.qty<item.stock)
                state.cartItems[idx].qty++;
            }
            
        },

        DECREASE(state,action){
            let item=action.payload
            let idx=state.cartItems.findIndex(i=>i._id===item._id);
            if(idx!==-1){
                if(item.qty>1)
                state.cartItems[idx].qty--;
            }
        }

    }
})

export const {ADD_TO_CART, CALCULATE_TOTAL, REMOVE_FROM_CART, EMPTY_CART, INCREASE, DECREASE} = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
export const selectTotal = state => state.cart.total;
export default cartSlice;