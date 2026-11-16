import './CartPage.scss'

import { useAppSelector } from '../../app/hooks'
import { selectCartCount, selectCartProducts } from '../../features/cart/model/cartSlice'
import { CartEmpty } from '../../features/cart/ui/CartEmpty'
import { CartItem } from '../../features/cart/ui/CartItem'
import { CartSummary } from '../../features/cart/ui/CartSummary'
import { pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'

export const CartPage = () => {
    const items = useAppSelector(selectCartProducts)
    const count = useAppSelector(selectCartCount)

    if (items.length === 0) {
        return <CartEmpty />
    }

    return (
        <section className="cart-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Кошик' }]} />
            <header className="cart-page__header">
                <h1 className="cart-page__title">Кошик</h1>
                <span className="cart-page__count">
                    {count} {pluralize(count, ['товар', 'товари', 'товарів'])}
                </span>
            </header>
            <div className="cart-page__content">
                <div className="cart-page__items">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <CartSummary />
            </div>
        </section>
    )
}
