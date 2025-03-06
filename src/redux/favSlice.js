import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const favSlice = createSlice({
    name: 'fav',
    initialState: { favProducts: [] },
    reducers: {
        ADD_TO_FAV(state, action) {
            const product=action.payload
            if (product) {
                let idx=state.favProducts.findIndex(p=>p._id===product._id)
                if(idx==-1){
                    state.favProducts.push(action.payload);
                    toast.success('Product added to Favourites');
                }
                else if(idx!==-1){
                    toast.info('Product already added to Favourites');
                }
            }
        },
        REMOVE_FROM_FAV(state,action){
            const product=action.payload
            if (product) {
                let idx=state.favProducts.findIndex(p=>p._id===product._id)
                if(idx==-1){
                    toast.info('Product not in your Favourites');
                }
                else if(idx!==-1){
                    state.favProducts=state.favProducts.filter(p=>p._id!==product._id)
                    toast.success('Product removed from Favourites');
                }
            }
        }
    }
})

export default favSlice;
export const { ADD_TO_FAV,REMOVE_FROM_FAV } = favSlice.actions;
export const selectFavProducts = state => state.fav.favProducts;