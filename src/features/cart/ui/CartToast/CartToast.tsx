import './CartToast.scss'

import { useEffect } from 'react'
import { FiCheck, FiShoppingCart, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { hideCartToast, selectCartToast } from '../../model/cartSlice'

const TOAST_DURATION = 3000

export const CartToast = () => {
    const dispatch = useAppDispatch()
    const toast = useAppSelector(selectCartToast)

    useEffect(() => {
        if (!toast) {
            return
        }
        const timer = setTimeout(() => dispatch(hideCartToast()), TOAST_DURATION)
        return () => clearTimeout(timer)
    }, [toast, dispatch])

    if (!toast) {
        return null
    }

    return (
        <div className="cart-toast" role="status" aria-live="polite">
            <span className="cart-toast__icon" aria-hidden="true">
                <FiCheck />
            </span>
            <span className="cart-toast__text">«{toast.title}» додано до кошика</span>
            <Link to="/cart" className="cart-toast__link">
                <FiShoppingCart aria-hidden="true" />
                Кошик
            </Link>
            <button
                type="button"
                className="cart-toast__close"
                onClick={() => dispatch(hideCartToast())}
                aria-label="Закрити сповіщення"
            >
                <FiX />
            </button>
        </div>
    )
}
