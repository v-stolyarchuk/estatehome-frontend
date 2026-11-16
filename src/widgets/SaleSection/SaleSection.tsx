import './SaleSection.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { Settings } from 'react-slick'
import SliderImport from 'react-slick'

import { useAppSelector } from '../../app/hooks'
import { getProductDiscountPercent, selectProducts } from '../../entities/product'
import { ConnectedProductCard } from '../../features/product-card'

// Vite's CJS interop returns the module namespace; unwrap the real component
const Slider = (SliderImport as unknown as { default: typeof SliderImport }).default ?? SliderImport

const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 2 },
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1 },
        },
    ],
}

export const SaleSection = () => {
    const products = useAppSelector(selectProducts)
    const saleProducts = products.filter((product) => getProductDiscountPercent(product) !== null)

    if (saleProducts.length === 0) {
        return null
    }

    return (
        <section className="sale-section">
            <div className="sale-section__header">
                <h2 className="sale-section__title">Товари зі знижкою</h2>
                <span className="sale-section__subtitle">Вигідні пропозиції цього тижня</span>
            </div>
            <div className="sale-section__slider">
                <Slider {...settings}>
                    {saleProducts.map((product) => (
                        <div key={product.id} className="sale-section__slide">
                            <ConnectedProductCard product={product} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
