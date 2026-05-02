import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action)=>{
            const exist = state.cartItems.find((item)=>item.id === action.payload.id)
            if(exist) {
                return
            }else{
              state.cartItems.push({...action.payload, quantity:1})  
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        increaseQuantity: (state, action)=>{
            const item = state.cartItems.find((item)=> item.id === action.payload)
            if(item) item.quantity += 1
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        decreaseQuantity: (state, action)=>{
            const item = state.cartItems.find((item)=> item.id === action.payload)
            if(item && item.quantity>1){
                item.quantity -= 1
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter((item)=> item.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }
    }
})

export const {addToCart, removeFromCart, decreaseQuantity, increaseQuantity} = cartSlice.actions
export default cartSlice.reducer