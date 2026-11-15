import type { Product } from './product.types'

export const getProductImageUrl = (product: Product, index = 0): string => {
    const image = product.images[index]
    return image ? `images/products/${image}` : ''
}
