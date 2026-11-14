import './CartItem.scss'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/hooks'
import { getCategoryLabel } from '../../../../entities/category'
import { getProductImageUrl } from '../../../../entities/product'
import { formatPrice } from '../../../../shared/lib'
import type { CartItem as CartItemType } from '../../model/cartSlice'
import { removeFromCart } from '../../model/cartSlice'
import { CartQuantity } from '../CartQuantity'

interface CartItemProps {
    item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useAppDispatch()
    const { product, quantity } = item

    return (
        <article className="cart-item">
            <div className="cart-item__image">
                {product.images.length > 0 ? (
                    <img src={getProductImageUrl(product)} alt={product.title} />
                ) : (
                    <span className="cart-item__placeholder">
                        {getCategoryLabel(product.category)}
                    </span>
                )}
            </div>
            <div className="cart-item__body">
                <Link to={`/product/${product.slug}`} className="cart-item__title">
                    {product.title}
                </Link>
                <span className="cart-item__price">{formatPrice(product.price)}</span>
            </div>
            <CartQuantity id={product.id} quantity={quantity} />
            <div className="cart-item__total">{formatPrice(product.price * quantity)}</div>
            <button
                type="button"
                className="cart-item__remove"
                onClick={() => dispatch(removeFromCart(product.id))}
                aria-label={`Прибрати ${product.title} з кошика`}
            >
                ×
            </button>
        </article>
    )
}
