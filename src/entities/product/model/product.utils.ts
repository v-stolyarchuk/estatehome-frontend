import type { Product } from './product.types'

export const getProductImageUrl = (product: Product, index = 0): string => {
    const image = product.images[index]
    return image ? `images/products/${image}` : ''
}

export const getProductDiscountPercent = (product: Product): number | null => {
    return product.oldPrice && product.oldPrice > product.price
        ? Math.round((1 - product.price / product.oldPrice) * 100)
        : null
}

const NEW_PRODUCT_DAYS = 30
const DAY_IN_MS = 24 * 60 * 60 * 1000

export const getProductIsNew = (product: Product): boolean => {
    const createdAt = new Date(product.createdAt).getTime()
    if (!Number.isFinite(createdAt)) {
        return false
    }
    const age = Date.now() - createdAt
    return age >= 0 && age <= NEW_PRODUCT_DAYS * DAY_IN_MS
}
