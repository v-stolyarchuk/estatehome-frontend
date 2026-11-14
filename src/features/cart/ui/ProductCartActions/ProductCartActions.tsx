import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import type { Product } from '../../../../entities/product'
import { Button } from '../../../../shared/ui/Button'
import { addToCart, selectCartItems } from '../../model/cartSlice'
import { ProductCartPanel } from '../ProductCartPanel'

interface ProductCartActionsProps {
    product: Product
}

export const ProductCartActions = ({ product }: ProductCartActionsProps) => {
    const dispatch = useAppDispatch()
    const cartItem = useAppSelector((state) =>
        selectCartItems(state).find((item) => item.product.id === product.id),
    )

    if (cartItem) {
        return <ProductCartPanel product={product} quantity={cartItem.quantity} />
    }

    return (
        <Button
            variant="success"
            size="sm"
            onClick={() => dispatch(addToCart(product))}
            disabled={product.availability === 'out-of-stock'}
        >
            В кошик
        </Button>
    )
}
