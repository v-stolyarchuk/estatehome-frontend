import type { Product } from '../../../../entities/product'
import { ConnectedProductCard } from '../../../product-card'

interface FavouritesItemProps {
    product: Product
}

export const FavouritesItem = ({ product }: FavouritesItemProps) => {
    return <ConnectedProductCard product={product} />
}
