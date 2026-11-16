import './SaleSection.scss'

import { useAppSelector } from '../../app/hooks'
import { getProductDiscountPercent, selectProducts } from '../../entities/product'
import { ConnectedProductCard } from '../../features/product-card'

export const SaleSection = () => {
    const products = useAppSelector(selectProducts)
    const saleProducts = products.filter((product) => getProductDiscountPercent(product) !== null)

    if (saleProducts.length === 0) {
        return null
    }

    return (
        <section className="sale-section">
            <div className="sale-section__header">
                <h2 className="sale-section__title">Товари зі зжкою</h2>
                <span className="sale-section__subtitle">Вигідні пропозиції цього тижня</span>
            </div>
            <div className="sale-section__grid">
                {saleProducts.map((product) => (
                    <ConnectedProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
