import './ProductCartPanel.scss'

import { useAppDispatch } from '../../../../app/hooks'
import type { Product } from '../../../../entities/product'
import { Button } from '../../../../shared/ui/Button'
import { removeFromCart, updateQuantity } from '../../model/cartSlice'

interface ProductCartPanelProps {
    product: Product
    quantity: number
}

export const ProductCartPanel = ({ product, quantity }: ProductCartPanelProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className="product-cart-panel">
            <div className="product-cart-panel__quantity">
                <button
                    type="button"
                    className="product-cart-panel__quantity-button"
                    onClick={() =>
                        dispatch(
                            updateQuantity({
                                id: product.id,
                                quantity: quantity - 1,
                            }),
                        )
                    }
                    disabled={quantity <= 1}
                    aria-label="Зменшити кількість"
                >
                    −
                </button>
                <span className="product-cart-panel__quantity-value">{quantity}</span>
                <button
                    type="button"
                    className="product-cart-panel__quantity-button"
                    onClick={() =>
                        dispatch(
                            updateQuantity({
                                id: product.id,
                                quantity: quantity + 1,
                            }),
                        )
                    }
                    aria-label="Збільшити кількість"
                >
                    +
                </button>
            </div>
            <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(product.id))}>
                Видалити
            </Button>
        </div>
    )
}
