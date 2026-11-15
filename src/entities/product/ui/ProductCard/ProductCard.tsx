import './ProductCard.scss'

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { formatPrice, pluralize } from '../../../../shared/lib'
import { Button } from '../../../../shared/ui/Button'
import { getCategoryLabel } from '../../../category'
import { PRODUCT_AVAILABILITY_LABELS, PRODUCT_BADGE_LABELS } from '../../model/product.labels'
import type { Product } from '../../model/product.types'
import { getProductDiscountPercent, getProductImageUrl } from '../../model/product.utils'

interface ProductCardProps {
    product: Product
    imageOverlay?: ReactNode
    cartAction?: ReactNode
}

export const ProductCard = ({ product, imageOverlay, cartAction }: ProductCardProps) => {
    const showAvailability = product.availability !== 'in-stock'
    const availabilityLabel = showAvailability
        ? PRODUCT_AVAILABILITY_LABELS[product.availability]
        : null
    const discountPercent = getProductDiscountPercent(product)
    const hasBadges =
        (product.badges?.length ?? 0) > 0 || showAvailability || discountPercent !== null

    return (
        <article className="product-card">
            <div className="product-card__image">
                {imageOverlay}
                {hasBadges && (
                    <div className="product-card__badges">
                        {discountPercent !== null && (
                            <span className="product-card__badge product-card__badge--discount">
                                −{discountPercent}%
                            </span>
                        )}
                        {product.badges?.map((badge) => (
                            <span
                                key={badge}
                                className={`product-card__badge product-card__badge--${badge}`}
                            >
                                {PRODUCT_BADGE_LABELS[badge]}
                            </span>
                        ))}
                        {availabilityLabel && (
                            <span
                                className={`product-card__badge product-card__badge--${product.availability}`}
                            >
                                {availabilityLabel}
                            </span>
                        )}
                    </div>
                )}
                {product.images.length > 0 ? (
                    <Link to={`/product/${product.slug}`} className="product-card__image-link">
                        <img src={getProductImageUrl(product)} alt={product.title} />
                    </Link>
                ) : (
                    <span className="product-card__placeholder">
                        {getCategoryLabel(product.category)}
                    </span>
                )}
            </div>
            <div className="product-card__body">
                <span className="product-card__category">{getCategoryLabel(product.category)}</span>
                <h3 className="product-card__title">
                    <Link to={`/product/${product.slug}`}>{product.title}</Link>
                </h3>
                <p className="product-card__description">{product.description}</p>
                {product.rating !== undefined && (
                    <span className="product-card__rating">
                        <span className="product-card__rating-star" aria-hidden="true">
                            ★
                        </span>{' '}
                        {product.rating}
                        {product.reviewsCount !== undefined &&
                            ` · ${product.reviewsCount} ${pluralize(product.reviewsCount, ['відгук', 'відгуки', 'відгуків'])}`}
                    </span>
                )}
                <div className="product-card__footer">
                    <div className="product-card__price">
                        <span className="product-card__price-current">
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                            <span className="product-card__price-old">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>
                    <div className="product-card__actions">
                        <Button to={`/product/${product.slug}`} size="sm">
                            Детальніше
                        </Button>
                        {cartAction}
                    </div>
                </div>
            </div>
        </article>
    )
}
