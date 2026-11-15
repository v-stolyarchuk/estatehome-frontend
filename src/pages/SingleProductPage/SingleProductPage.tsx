import './SingleProductPage.scss'

import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { getCategoryLabel } from '../../entities/category'
import type { ProductAttribute } from '../../entities/product'
import {
    PRODUCT_AVAILABILITY_LABELS,
    PRODUCT_BADGE_LABELS,
    selectProducts,
} from '../../entities/product'
import { ProductCartActions } from '../../features/cart/ui/ProductCartActions'
import { FavouriteButton } from '../../features/favourites/ui/FavouriteButton'
import { formatPrice, pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { EmptyState } from '../../shared/ui/EmptyState'
import { ProductGallery } from '../../widgets/ProductGallery'

export function SingleProductPage() {
    const { slug } = useParams()
    const products = useAppSelector(selectProducts)
    const product = products.find((item) => item.slug === slug)

    if (!product) {
        return (
            <EmptyState
                icon="📦"
                title="Товар не знайдено"
                text="Можливо, товар видалено або посилання неправильне."
                actionLabel="До каталогу"
                actionTo="/catalog"
            />
        )
    }

    const availabilityLabel = PRODUCT_AVAILABILITY_LABELS[product.availability]
    const discount =
        product.oldPrice && product.oldPrice > product.price
            ? Math.round((1 - product.price / product.oldPrice) * 100)
            : null

    return (
        <section className="single-product-page">
            <Breadcrumbs
                items={[
                    { label: 'Головна', to: '/' },
                    { label: 'Каталог', to: '/catalog' },
                    { label: product.title },
                ]}
            />

            <div className="single-product-page__layout">
                <ProductGallery product={product} />

                <div className="single-product-page__info">
                    <div className="single-product-page__badges">
                        {product.badges?.map((badge) => (
                            <span
                                key={badge}
                                className={`single-product-page__badge single-product-page__badge--${badge}`}
                            >
                                {PRODUCT_BADGE_LABELS[badge]}
                            </span>
                        ))}
                        {availabilityLabel && (
                            <span
                                className={`single-product-page__badge single-product-page__badge--${product.availability}`}
                            >
                                {availabilityLabel}
                            </span>
                        )}
                    </div>

                    <span className="single-product-page__category">
                        {getCategoryLabel(product.category)}
                    </span>
                    <h1 className="single-product-page__title">{product.title}</h1>
                    <span className="single-product-page__sku">SKU: {product.sku}</span>

                    {product.rating !== undefined && (
                        <span className="single-product-page__rating">
                            ★ {product.rating}
                            {product.reviewsCount !== undefined &&
                                ` · ${product.reviewsCount} ${pluralize(product.reviewsCount, ['відгук', 'відгуки', 'відгуків'])}`}
                        </span>
                    )}

                    <div className="single-product-page__price">
                        <span className="single-product-page__price-current">
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                            <span className="single-product-page__price-old">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                        {discount !== null && (
                            <span className="single-product-page__discount">−{discount}%</span>
                        )}
                    </div>

                    <p className="single-product-page__description">{product.description}</p>

                    {product.attributes.length > 0 && (
                        <div className="single-product-page__attributes">
                            <h2 className="single-product-page__section-title">Характеристики</h2>
                            <dl className="single-product-page__attributes-list">
                                {product.attributes.map((attribute: ProductAttribute) => (
                                    <div
                                        key={attribute.label}
                                        className="single-product-page__attribute"
                                    >
                                        <dt>{attribute.label}</dt>
                                        <dd>{attribute.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    <div className="single-product-page__actions">
                        <ProductCartActions product={product} />
                        <FavouriteButton product={product} />
                    </div>
                </div>
            </div>
        </section>
    )
}
