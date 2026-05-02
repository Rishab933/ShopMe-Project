import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    isLoading: false,
    categories: {},
  },
  reducers: {
    setLoading: (state, action) =>{
      state.isLoading = action.payload
    },
    setAllProducts: (state,action) =>{
      state.items = action.payload
      state.isLoading = false

      const grouped = action.payload.reduce((acc, product)=>{
        const cat = product.category
        if(!acc[cat]){
          acc[cat] = []
        }
        acc[cat].push(product)
        return acc
      },{})
      state.categories = grouped
    }
  }
})

export const { setAllProducts, setLoading } = productSlice.actions
export default productSlice.reducer