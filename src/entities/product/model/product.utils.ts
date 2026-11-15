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
