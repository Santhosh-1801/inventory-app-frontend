import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredProducts:[]
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTERED_PRODUCTS(state,action){
        const {products,search}=action.payload;
        const tempProducts=products.filter(
        (product)=>product.name.toLowerCase().includes(search.toLowerCase())||
            product.category.toLowerCase().includes(search.toLowerCase())
        )
        state.filteredProducts=tempProducts;

  }
}
});

export const {FILTERED_PRODUCTS} = filterSlice.actions

export const selectFilterProduct=(state)=>state.filter.filteredProducts

export default filterSlice.reducer