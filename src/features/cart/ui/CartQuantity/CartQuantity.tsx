import './CartQuantity.scss'

import { useAppDispatch } from '../../../../app/hooks'
import { updateQuantity } from '../../model/cartSlice'

interface CartQuantityProps {
    id: string
    quantity: number
}

export const CartQuantity = ({ id, quantity }: CartQuantityProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className="cart-quantity">
            <button
                type="button"
                className="cart-quantity__button"
                onClick={() => dispatch(updateQuantity({ id, quantity: quantity - 1 }))}
                disabled={quantity <= 1}
                aria-label="Зменшити кількість"
            >
                −
            </button>
            <span className="cart-quantity__value">{quantity}</span>
            <button
                type="button"
                className="cart-quantity__button"
                onClick={() => dispatch(updateQuantity({ id, quantity: quantity + 1 }))}
                aria-label="Збільшити кількість"
            >
                +
            </button>
        </div>
    )
}
