import './CartSummary.scss'

import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { formatPrice } from '../../../../shared/lib'
import { clearCart, selectCartCount, selectCartTotal } from '../../model/cartSlice'

export const CartSummary = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const count = useAppSelector(selectCartCount)
    const total = useAppSelector(selectCartTotal)

    return (
        <aside className="cart-summary">
            <h2 className="cart-summary__title">Підсумок замовлення</h2>
            <div className="cart-summary__row">
                <span className="cart-summary__label">Товарів</span>
                <span className="cart-summary__value">{count}</span>
            </div>
            <div className="cart-summary__row">
                <span className="cart-summary__label">Сума</span>
                <span className="cart-summary__value">{formatPrice(total)}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
                <span className="cart-summary__label">Разом</span>
                <span className="cart-summary__value">{formatPrice(total)}</span>
            </div>
            <button
                type="button"
                className="cart-summary__checkout"
                onClick={() => navigate('/checkout')}
            >
                Оформити замовлення
            </button>
            <button
                type="button"
                className="cart-summary__clear"
                onClick={() => dispatch(clearCart())}
            >
                Очистити кошик
            </button>
            <Link to="/catalog" className="cart-summary__continue">
                Продовжити покупки
            </Link>
        </aside>
    )
}
