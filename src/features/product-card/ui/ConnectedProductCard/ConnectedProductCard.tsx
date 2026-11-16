import type { Product } from '../../../../entities/product'
import { ProductCard } from '../../../../entities/product'
import { ProductCartActions } from '../../../cart/ui/ProductCartActions'
import { FavouriteButton } from '../../../favourites/ui/FavouriteButton'
import { QuickView } from '../QuickView'

interface ConnectedProductCardProps {
    product: Product
}

export const ConnectedProductCard = ({ product }: ConnectedProductCardProps) => {
    return (
        <ProductCard
            product={product}
            imageOverlay={
                <>
                    <FavouriteButton product={product} overlay />
                    <QuickView product={product} />
                </>
            }
            cartAction={<ProductCartActions product={product} />}
        />
    )
}
