import type { ComponentType } from 'react'

import { BlogPage } from '../../pages/BlogPage'
import { CartPage } from '../../pages/CartPage'
import { CatalogPage } from '../../pages/CatalogPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { ContactsPage } from '../../pages/ContactsPage'
import { FavouritesPage } from '../../pages/FavouritesPage'
import { HomePage } from '../../pages/HomePage'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { SingleProductPage } from '../../pages/SingleProductPage'

export interface AppRoute {
    path: string
    Component: ComponentType
}

export const routes: AppRoute[] = [
    { path: '/', Component: HomePage },
    { path: '/catalog', Component: CatalogPage },
    { path: '/product/:slug', Component: SingleProductPage },
    { path: '/cart', Component: CartPage },
    { path: '/checkout', Component: CheckoutPage },
    { path: '/favourites', Component: FavouritesPage },
    { path: '/contacts', Component: ContactsPage },
    { path: '/blog', Component: BlogPage },
    { path: '*', Component: NotFoundPage },
]
