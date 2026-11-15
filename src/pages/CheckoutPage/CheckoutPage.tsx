import './CheckoutPage.scss'

import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getProductImageUrl } from '../../entities/product'
import { clearCart, selectCartItems, selectCartTotal } from '../../features/cart/model/cartSlice'
import { CartEmpty } from '../../features/cart/ui/CartEmpty'
import type { CheckoutFormData } from '../../features/checkout'
import { CheckoutForm, getDeliveryMethodLabel } from '../../features/checkout'
import { formatPrice, pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'

interface PlacedOrder extends CheckoutFormData {
    orderNumber: string
    total: number
}

const generateOrderNumber = () => `EH-${Date.now().toString(36).toUpperCase()}`

export const CheckoutPage = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectCartItems)
    const total = useAppSelector(selectCartTotal)
    const [order, setOrder] = useState<PlacedOrder | null>(null)

    if (order) {
        return (
            <section className="checkout-page">
                <Breadcrumbs
                    items={[
                        { label: 'Головна', to: '/' },
                        { label: 'Кошик', to: '/cart' },
                        { label: 'Оформлення' },
                    ]}
                />
                <div className="checkout-success">
                    <span className="checkout-success__icon" aria-hidden="true">
                        <FiCheck />
                    </span>
                    <h1 className="checkout-success__title">Дякуємо за замовлення!</h1>
                    <p className="checkout-success__text">
                        Ваше замовлення <strong>{order.orderNumber}</strong> прийнято в обробку. Ми
                        зв’яжемося з вами для підтвердження.
                    </p>
                    <dl className="checkout-success__details">
                        <div className="checkout-success__row">
                            <dt>Отримувач</dt>
                            <dd>{order.fullName}</dd>
                        </div>
                        <div className="checkout-success__row">
                            <dt>Телефон</dt>
                            <dd>{order.phone}</dd>
                        </div>
                        {order.email && (
                            <div className="checkout-success__row">
                                <dt>Email</dt>
                                <dd>{order.email}</dd>
                            </div>
                        )}
                        <div className="checkout-success__row">
                            <dt>Доставка</dt>
                            <dd>
                                {getDeliveryMethodLabel(order.deliveryMethod)}
                                {order.city && `, ${order.city}`}
                                {order.address && `, ${order.address}`}
                            </dd>
                        </div>
                        <div className="checkout-success__row">
                            <dt>Сума</dt>
                            <dd>{formatPrice(order.total)}</dd>
                        </div>
                    </dl>
                    <div className="checkout-success__actions">
                        <Button to="/">На головну</Button>
                        <Button to="/catalog" variant="secondary">
                            До каталогу
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    if (items.length === 0) {
        return <CartEmpty />
    }

    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const handleSubmit = (data: CheckoutFormData) => {
        setOrder({
            ...data,
            orderNumber: generateOrderNumber(),
            total,
        })
        dispatch(clearCart())
    }

    return (
        <section className="checkout-page">
            <Breadcrumbs
                items={[
                    { label: 'Головна', to: '/' },
                    { label: 'Кошик', to: '/cart' },
                    { label: 'Оформлення' },
                ]}
            />
            <header className="checkout-page__header">
                <h1 className="checkout-page__title">Оформлення замовлення</h1>
                <span className="checkout-page__count">
                    {itemsCount} {pluralize(itemsCount, ['товар', 'товари', 'товарів'])}
                </span>
            </header>
            <div className="checkout-page__content">
                <CheckoutForm onSubmit={handleSubmit} />
                <aside className="checkout-summary">
                    <h2 className="checkout-summary__title">Ваше замовлення</h2>
                    <ul className="checkout-summary__list">
                        {items.map((item) => (
                            <li key={item.product.id} className="checkout-summary__item">
                                <div className="checkout-summary__image">
                                    {item.product.images.length > 0 ? (
                                        <img
                                            src={getProductImageUrl(item.product)}
                                            alt={item.product.title}
                                        />
                                    ) : (
                                        <span className="checkout-summary__placeholder" />
                                    )}
                                </div>
                                <div className="checkout-summary__body">
                                    <span className="checkout-summary__name">
                                        {item.product.title}
                                    </span>
                                    <span className="checkout-summary__qty">
                                        {item.quantity} × {formatPrice(item.product.price)}
                                    </span>
                                </div>
                                <span className="checkout-summary__price">
                                    {formatPrice(item.product.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-summary__total">
                        <span>Разом</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>
                    <p className="checkout-summary__note">Оплата при отриманні</p>
                </aside>
            </div>
        </section>
    )
}
