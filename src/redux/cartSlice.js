import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { calculateSubtotal } from '../utils/pricing';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers: {
        ADD_TO_CART(state,action){
            let idx=state.cartItems.findIndex(item=>item._id===action.payload._id);
            if (Number(action.payload.stock) <= 0) {
                toast.error('This product is out of stock');
            }
            else if(idx===-1){
                state.cartItems.push({...action.payload,qty:1});
                toast.success('Added to cart');
            } 
            else  toast.info('Item already added');
            
            
        },
        CALCULATE_TOTAL(state){
            state.total=calculateSubtotal(state.cartItems);
        },

        REMOVE_FROM_CART(state,action){
            state.cartItems= state.cartItems.filter(item=>item._id!==action.payload);
            state.total=calculateSubtotal(state.cartItems);
        },

        EMPTY_CART(state){
            state.cartItems=[]
            state.total=0
        },
        INCREASE(state,action){
            let item=action.payload
            let idx=state.cartItems.findIndex(i=>i._id===item._id);
            if(idx!==-1){
                if(item.qty<item.stock)
                state.cartItems[idx].qty++;
                state.total=calculateSubtotal(state.cartItems);
            }
            
        },

        DECREASE(state,action){
            let item=action.payload
            let idx=state.cartItems.findIndex(i=>i._id===item._id);
            if(idx!==-1){
                if(item.qty>1)
                state.cartItems[idx].qty--;
                state.total=calculateSubtotal(state.cartItems);
            }
        }

    }
})

export const {ADD_TO_CART, CALCULATE_TOTAL, REMOVE_FROM_CART, EMPTY_CART, INCREASE, DECREASE} = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
export const selectTotal = state => state.cart.total;
export default cartSlice;
