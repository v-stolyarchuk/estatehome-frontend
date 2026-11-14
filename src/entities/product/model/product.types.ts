import type { CategorySlug } from '../../category'

export type ProductAvailability = 'in-stock' | 'out-of-stock' | 'on-order'

export type ProductBadge = 'new' | 'bestseller'

export interface ProductAttribute {
    label: string
    value: string
}

export interface Product {
    /** Стабільний ідентифікатор (для кошика, обраного, API) */
    id: string
    /** Для URL: /product/:slug */
    slug: string
    /** Артикул магазину, а не постачальника */
    sku: string
    title: string
    description: string
    /** Ціна в гривнях, ціле число */
    price: number
    /** Стара ціна; наявність означає акцію */
    oldPrice?: number
    category: CategorySlug
    /** Перше зображення головне; alt = title */
    images: string[]
    availability: ProductAvailability
    attributes: ProductAttribute[]
    badges?: ProductBadge[]
    rating?: number
    reviewsCount?: number
    /** ISO-дата, для сортування «Новинки» */
    createdAt: string
}
