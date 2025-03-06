import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: { filterProducts: [], searchVal: '', catVal: '', priceFilterVal: '' },
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            // console.log(action.payload);
            let { products, search } = action.payload;
            if (search !== '' && search !== undefined) {
                // console.log('search: ',search);
                let fp = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
                state.filterProducts = fp;
            }
            else if(search===''){
                state.filterProducts=products;
            }
            state.searchVal = search;
        },
        FILTER_BY_CATEGORY(state, action) {
            // console.log(action.payload);
            let { products, selectedCategory } = action.payload;
            if (selectedCategory !== '' && selectedCategory !== undefined) {
                let fp = products.filter(p => p.category === selectedCategory);
                state.filterProducts = fp;
                state.catVal = selectedCategory;
            }
            
        },
        PRICE_FITER(state, action) {
            // console.log(action.payload);
            const { priceFilter, products } = action.payload;
            if (priceFilter !== '' && priceFilter !== undefined) {
                if (priceFilter === 'hightolow') {
                    state.filterProducts =  [...products].sort((x, y) => y.price - x.price);
                    state.priceFilterVal = priceFilter;
                }
                else if (priceFilter === 'lowtohigh') {
                    state.filterProducts =  [...products].sort((x, y) => x.price - y.price);
                    state.priceFilterVal = priceFilter;
                }
            }
        }
    }
})

export default filterSlice;
export const { FILTER_BY_SEARCH, FILTER_BY_CATEGORY, PRICE_FITER } = filterSlice.actions;
export const selectFilterProducts = state => state.filter.filterProducts;
export const selectSearchVal = state => state.filter.searchVal;
export const selectCatVal = state => state.filter.catVal;
export const selectPriceFilterVal = state => state.filter.priceFilterVal;