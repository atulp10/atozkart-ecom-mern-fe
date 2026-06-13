import { createSlice } from "@reduxjs/toolkit";

const applyFilters = (products, { searchVal, catVal, priceFilterVal }) => {
    let result = [...products];
    if (searchVal) result = result.filter((product) => product.title.toLowerCase().includes(searchVal.toLowerCase()));
    if (catVal) result = result.filter((product) => product.category === catVal);
    if (priceFilterVal === 'hightolow') result.sort((a, b) => Number(b.price) - Number(a.price));
    if (priceFilterVal === 'lowtohigh') result.sort((a, b) => Number(a.price) - Number(b.price));
    return result;
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: { filterProducts: [], searchVal: '', catVal: '', priceFilterVal: '' },
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            let { products, search } = action.payload;
            state.searchVal = search || '';
            state.filterProducts = applyFilters(products, state);
        },
        FILTER_BY_CATEGORY(state, action) {
            let { products, selectedCategory } = action.payload;
            state.catVal = selectedCategory || '';
            state.filterProducts = applyFilters(products, state);
            
        },
        PRICE_FITER(state, action) {
            const { priceFilter, products } = action.payload;
            state.priceFilterVal = priceFilter || '';
            state.filterProducts = applyFilters(products, state);
        },
        RESET_FILTERS(state, action) {
            state.searchVal = '';
            state.catVal = '';
            state.priceFilterVal = '';
            state.filterProducts = action.payload || [];
        }
    }
})

export default filterSlice;
export const { FILTER_BY_SEARCH, FILTER_BY_CATEGORY, PRICE_FITER, RESET_FILTERS } = filterSlice.actions;
export const selectFilterProducts = state => state.filter.filterProducts;
export const selectSearchVal = state => state.filter.searchVal;
export const selectCatVal = state => state.filter.catVal;
export const selectPriceFilterVal = state => state.filter.priceFilterVal;
