import './MainSlider.scss'

import { useState } from 'react'

import heroImage from '../../assets/hero.png'
import { SliderSettings } from './components/SliderSettings'
import { SliderSlide } from './components/SliderSlide'
import type { Slide } from './MainSlider.types'

const slides: Slide[] = [
    {
        id: 1,
        image: heroImage,
        badge: 'Хіт сезону',
        title: 'Все для дому — в одному магазині',
        text: 'Меблі, декор, сад і товари для тварин. Швидка доставка та оплата при отриманні.',
        highlight: 'До −30% на новинки',
        ctaLabel: 'Перейти до каталогу',
        ctaTo: '/catalog',
        theme: 'primary',
    },
    {
        id: 2,
        image: '/images/products/product-template1.jpg',
        badge: 'Безкоштовна доставка',
        title: 'Замовлення від 2 000 ₴ — з доставкою 0 ₴',
        text: 'Дбайливо пакуємо та доставляємо по всій Україні. Відстежуйте посилку в особистому кабінеті.',
        ctaLabel: 'Обрати товари',
        ctaTo: '/catalog',
        theme: 'info',
    },
    {
        id: 3,
        image: '/images/products/product-template2.jpg',
        badge: 'Повернення 30 днів',
        title: 'Не сподобалося? Повернемо кошти',
        text: 'Гарантія задоволення: повернення або обмін протягом 30 днів без зайвих питань.',
        ctaLabel: 'Дізнатися більше',
        ctaTo: '/contacts',
        theme: 'success',
    },
]

export const MainSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const goTo = (index: number) => {
        setActiveIndex((index + slides.length) % slides.length)
    }

    return (
        <section className="main-slider">
            <div className="main-slider__viewport">
                <div
                    className="main-slider__track"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`main-slider__slide main-slider__slide--${slide.theme}`}
                        >
                            <SliderSlide
                                image={slide.image}
                                badge={slide.badge}
                                title={slide.title}
                                text={slide.text}
                                highlight={slide.highlight}
                                ctaLabel={slide.ctaLabel}
                                ctaTo={slide.ctaTo}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="main-slider__arrow main-slider__arrow--prev"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Попередній слайд"
            >
                ‹
            </button>
            <button
                type="button"
                className="main-slider__arrow main-slider__arrow--next"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Наступний слайд"
            >
                ›
            </button>

            <SliderSettings
                total={slides.length}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
            />
        </section>
    )
}
