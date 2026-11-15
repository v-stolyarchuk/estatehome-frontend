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
    title: string
    Component: ComponentType
}

export const routes: AppRoute[] = [
    { path: '/', title: 'Головна', Component: HomePage },
    { path: '/catalog', title: 'Каталог', Component: CatalogPage },
    { path: '/product/:slug', title: 'Товар', Component: SingleProductPage },
    { path: '/cart', title: 'Кошик', Component: CartPage },
    { path: '/checkout', title: 'Оформлення замовлення', Component: CheckoutPage },
    { path: '/favourites', title: 'Обране', Component: FavouritesPage },
    { path: '/contacts', title: 'Контакти', Component: ContactsPage },
    { path: '/blog', title: 'Блог', Component: BlogPage },
    { path: '*', title: 'Сторінку не знайдено', Component: NotFoundPage },
]
