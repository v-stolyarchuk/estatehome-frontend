import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Product } from './product.types'
import { productsData } from './productsData'

interface ProductsState {
    items: Product[]
}

const initialState: ProductsState = {
    items: productsData,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.items.push(action.payload)
        },
    },
})

export const { addProduct } = productsSlice.actions

export const selectProducts = (state: { products: ProductsState }) => state.products.items

export default productsSlice.reducer
