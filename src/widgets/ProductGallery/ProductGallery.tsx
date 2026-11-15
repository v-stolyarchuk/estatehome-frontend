import './ProductGallery.scss'

import type { TouchEvent } from 'react'
import { useRef, useState } from 'react'

import { getCategoryLabel } from '../../entities/category'
import type { Product } from '../../entities/product'
import { getProductImageUrl } from '../../entities/product'
import { Modal } from '../../shared/ui/Modal'

type ProductGalleryProps = {
    product: Product
}

const SWIPE_THRESHOLD = 40

export const ProductGallery = ({ product }: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isZoomOpen, setIsZoomOpen] = useState(false)
    const [zoomIndex, setZoomIndex] = useState(0)
    const touchStartX = useRef<number | null>(null)
    const didSwipe = useRef(false)
    const zoomTouchStartX = useRef<number | null>(null)
    const imageCount = product.images.length

    const goTo = (index: number) => {
        setActiveIndex((index + imageCount) % imageCount)
    }

    const goToZoom = (index: number) => {
        setZoomIndex((index + imageCount) % imageCount)
    }

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = event.touches[0].clientX
        didSwipe.current = false
    }

    const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return
        const delta = event.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null
        if (Math.abs(delta) < SWIPE_THRESHOLD) return
        didSwipe.current = true
        goTo(activeIndex + (delta < 0 ? 1 : -1))
    }

    const handleZoomTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        zoomTouchStartX.current = event.touches[0].clientX
    }

    const handleZoomTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
        if (zoomTouchStartX.current === null) return
        const delta = event.changedTouches[0].clientX - zoomTouchStartX.current
        zoomTouchStartX.current = null
        if (Math.abs(delta) < SWIPE_THRESHOLD) return
        goToZoom(zoomIndex + (delta < 0 ? 1 : -1))
    }

    const handleImageClick = () => {
        if (didSwipe.current) {
            didSwipe.current = false
            return
        }
        setZoomIndex(activeIndex)
        setIsZoomOpen(true)
    }

    return (
        <div className="product-gallery">
            <div
                className="product-gallery__main"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {imageCount > 0 ? (
                    <button
                        type="button"
                        className="product-gallery__main-button"
                        onClick={handleImageClick}
                        aria-label={`Збільшити зображення: ${product.title}`}
                    >
                        <img
                            key={activeIndex}
                            src={getProductImageUrl(product, activeIndex)}
                            alt={product.title}
                            className="product-gallery__main-image"
                        />
                    </button>
                ) : (
                    <span className="product-gallery__placeholder">
                        {getCategoryLabel(product.category)}
                    </span>
                )}

                {imageCount > 1 && (
                    <>
                        <button
                            type="button"
                            className="product-gallery__arrow product-gallery__arrow--prev"
                            onClick={() => goTo(activeIndex - 1)}
                            aria-label="Попереднє зображення"
                        />
                        <button
                            type="button"
                            className="product-gallery__arrow product-gallery__arrow--next"
                            onClick={() => goTo(activeIndex + 1)}
                            aria-label="Наступне зображення"
                        />
                    </>
                )}
            </div>

            {imageCount > 1 && (
                <div className="product-gallery__thumbs">
                    {product.images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            className={`product-gallery__thumb${index === activeIndex ? ' product-gallery__thumb--active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Показати зображення ${index + 1}`}
                            aria-pressed={index === activeIndex}
                        >
                            <img src={getProductImageUrl(product, index)} alt="" />
                        </button>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isZoomOpen}
                onClose={() => setIsZoomOpen(false)}
                title={product.title}
                wide
                fit
            >
                {imageCount > 0 && (
                    <div
                        className="product-gallery__zoom"
                        onTouchStart={handleZoomTouchStart}
                        onTouchEnd={handleZoomTouchEnd}
                    >
                        <img
                            key={zoomIndex}
                            src={getProductImageUrl(product, zoomIndex)}
                            alt={product.title}
                            className="product-gallery__zoom-image"
                        />
                        {imageCount > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="product-gallery__arrow product-gallery__arrow--prev"
                                    onClick={() => goToZoom(zoomIndex - 1)}
                                    aria-label="Попереднє зображення"
                                />
                                <button
                                    type="button"
                                    className="product-gallery__arrow product-gallery__arrow--next"
                                    onClick={() => goToZoom(zoomIndex + 1)}
                                    aria-label="Наступне зображення"
                                />
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    )
}
