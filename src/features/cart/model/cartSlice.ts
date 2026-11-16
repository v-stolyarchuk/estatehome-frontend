import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Product } from '../../../entities/product'

export interface CartItem {
    id: string
    quantity: number
}

export interface ResolvedCartItem extends CartItem {
    product: Product
}

export interface CartToast {
    title: string
}

interface CartState {
    items: CartItem[]
    toast: CartToast | null
}

interface CartStoreState {
    cart: CartState
    products: { items: Product[] }
}

const initialState: CartState = {
    items: [],
    toast: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find((item) => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ id: action.payload.id, quantity: 1 })
            }
            state.toast = { title: action.payload.title }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find((i) => i.id === action.payload.id)
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity)
            }
        },
        clearCart(state) {
            state.items = []
        },
        hideCartToast(state) {
            state.toast = null
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, hideCartToast } =
    cartSlice.actions

export const selectCartItems = (state: { cart: CartState }) => state.cart.items

export const selectCartProducts = (state: CartStoreState): ResolvedCartItem[] =>
    state.cart.items.flatMap((item) => {
        const product = state.products.items.find((p) => p.id === item.id)
        return product ? [{ ...item, product }] : []
    })

export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state: CartStoreState) =>
    selectCartProducts(state).reduce((sum, item) => sum + item.product.price * item.quantity, 0)

export const selectCartToast = (state: { cart: CartState }) => state.cart.toast

export default cartSlice.reducer
