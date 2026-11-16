import { configureStore } from '@reduxjs/toolkit'

import { productsReducer } from '../../entities/product'
import cartReducer, { type CartItem } from '../../features/cart/model/cartSlice'
import favouritesReducer from '../../features/favourites/model/favouritesSlice'
import { CART_STORAGE_KEY, FAVOURITES_STORAGE_KEY } from '../../shared/config/constants'

const loadCartItems = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY)
        const parsed: unknown = raw ? JSON.parse(raw) : []
        if (!Array.isArray(parsed)) {
            return []
        }
        return parsed.flatMap((entry) => {
            // Підтримка старого формату { product: { id }, quantity }
            const record = entry as {
                id?: unknown
                product?: { id?: unknown }
                quantity?: unknown
            }
            const id =
                typeof record.id === 'string'
                    ? record.id
                    : typeof record.product?.id === 'string'
                      ? record.product.id
                      : null
            const quantity = typeof record.quantity === 'number' ? record.quantity : 0
            return id && quantity > 0 ? [{ id, quantity }] : []
        })
    } catch {
        return []
    }
}

const loadFavouriteIds = (): string[] => {
    try {
        const raw = localStorage.getItem(FAVOURITES_STORAGE_KEY)
        const parsed: unknown = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed)
            ? parsed.filter((id): id is string => typeof id === 'string')
            : []
    } catch {
        return []
    }
}

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        favourites: favouritesReducer,
    },
    preloadedState: {
        cart: { items: loadCartItems(), toast: null },
        favourites: { ids: loadFavouriteIds() },
    },
})

let previousCartItems = store.getState().cart.items
let previousFavouriteIds = store.getState().favourites.ids

store.subscribe(() => {
    const { items } = store.getState().cart
    if (items !== previousCartItems) {
        previousCartItems = items
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }

    const { ids } = store.getState().favourites
    if (ids !== previousFavouriteIds) {
        previousFavouriteIds = ids
        localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(ids))
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
