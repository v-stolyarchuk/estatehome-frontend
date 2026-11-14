import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Product } from '../../../entities/product'

interface FavouritesState {
    ids: string[]
}

const initialState: FavouritesState = {
    ids: [],
}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite(state, action: PayloadAction<string>) {
            const index = state.ids.indexOf(action.payload)
            if (index === -1) {
                state.ids.push(action.payload)
            } else {
                state.ids.splice(index, 1)
            }
        },
    },
})

export const { toggleFavourite } = favouritesSlice.actions

export const selectFavouriteIds = (state: { favourites: FavouritesState }) => state.favourites.ids

export const selectFavouriteProducts = (state: {
    favourites: FavouritesState
    products: { items: Product[] }
}) => {
    const ids = state.favourites.ids
    return state.products.items.filter((product) => ids.includes(product.id))
}

export default favouritesSlice.reducer
