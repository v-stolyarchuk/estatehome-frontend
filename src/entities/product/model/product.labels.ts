import type { ProductAvailability, ProductBadge } from './product.types'

export const PRODUCT_BADGE_LABELS: Record<ProductBadge, string> = {
    new: 'Новинка',
    bestseller: 'Хіт',
}

export const PRODUCT_AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
    'in-stock': 'В наявності',
    'out-of-stock': 'Немає в наявності',
    'on-order': 'Під замовлення',
}
