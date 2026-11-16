import './QuickView.scss'

import { useState } from 'react'
import { FiEye } from 'react-icons/fi'

import { getCategoryLabel } from '../../../../entities/category'
import {
    getProductDiscountPercent,
    getProductImageUrl,
    type Product,
    PRODUCT_AVAILABILITY_LABELS,
    PRODUCT_BADGE_LABELS,
} from '../../../../entities/product'
import { formatPrice, pluralize } from '../../../../shared/lib'
import { Button } from '../../../../shared/ui/Button'
import { Modal } from '../../../../shared/ui/Modal'
import { ProductCartActions } from '../../../cart/ui/ProductCartActions'
import { FavouriteButton } from '../../../favourites/ui/FavouriteButton'

interface QuickViewProps {
    product: Product
}

export const QuickView = ({ product }: QuickViewProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const discount = getProductDiscountPercent(product)
    const availabilityLabel =
        product.availability !== 'in-stock'
            ? PRODUCT_AVAILABILITY_LABELS[product.availability]
            : null

    return (
        <>
            <button
                type="button"
                className="quick-view__button"
                onClick={() => setIsOpen(true)}
                aria-label={`Швидкий перегляд: ${product.title}`}
            >
                <FiEye />
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={product.title} wide>
                <div className="quick-view">
                    <div className="quick-view__gallery">
                        {product.images.length > 0 ? (
                            <img
                                src={getProductImageUrl(product, imageIndex)}
                                alt={product.title}
                                className="quick-view__image"
                            />
                        ) : (
                            <span className="quick-view__placeholder">
                                {getCategoryLabel(product.category)}
                            </span>
                        )}
                        {product.images.length > 1 && (
                            <div className="quick-view__thumbs">
                                {product.images.map((image, index) => (
                                    <button
                                        key={image}
                                        type="button"
                                        className={`quick-view__thumb${index === imageIndex ? ' quick-view__thumb--active' : ''}`}
                                        onClick={() => setImageIndex(index)}
                                        aria-label={`Показати зображення ${index + 1}`}
                                        aria-pressed={index === imageIndex}
                                    >
                                        <img src={getProductImageUrl(product, index)} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="quick-view__info">
                        <div className="quick-view__badges">
                            {discount !== null && (
                                <span className="quick-view__badge quick-view__badge--discount">
                                    −{discount}%
                                </span>
                            )}
                            {product.badges?.map((badge) => (
                                <span
                                    key={badge}
                                    className={`quick-view__badge quick-view__badge--${badge}`}
                                >
                                    {PRODUCT_BADGE_LABELS[badge]}
                                </span>
                            ))}
                            {availabilityLabel && (
                                <span
                                    className={`quick-view__badge quick-view__badge--${product.availability}`}
                                >
                                    {availabilityLabel}
                                </span>
                            )}
                        </div>

                        <span className="quick-view__category">
                            {getCategoryLabel(product.category)}
                        </span>
                        <h3 className="quick-view__title">{product.title}</h3>
                        <span className="quick-view__sku">SKU: {product.sku}</span>

                        {product.rating !== undefined && (
                            <span className="quick-view__rating">
                                <span className="quick-view__rating-star" aria-hidden="true">
                                    ★
                                </span>{' '}
                                {product.rating}
                                {product.reviewsCount !== undefined &&
                                    ` · ${product.reviewsCount} ${pluralize(product.reviewsCount, ['відгук', 'відгуки', 'відгуків'])}`}
                            </span>
                        )}

                        <p className="quick-view__description">{product.description}</p>

                        <div className="quick-view__price">
                            <span className="quick-view__price-current">
                                {formatPrice(product.price)}
                            </span>
                            {product.oldPrice && (
                                <span className="quick-view__price-old">
                                    {formatPrice(product.oldPrice)}
                                </span>
                            )}
                        </div>

                        <div className="quick-view__actions">
                            <ProductCartActions product={product} />
                            <FavouriteButton product={product} />
                            <Button to={`/product/${product.slug}`} variant="secondary" size="sm">
                                Детальніше
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
