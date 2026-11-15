import './MainSlider.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { Settings } from 'react-slick'
import SliderImport from 'react-slick'

import { SliderSlide } from './components/SliderSlide'
import type { Slide } from './MainSlider.types'

// Vite's CJS interop returns the module namespace; unwrap the real component
const Slider = (SliderImport as unknown as { default: typeof SliderImport }).default ?? SliderImport

const slides: Slide[] = [
    {
        id: 1,
        image: 'images/home-slider/room-slide.jpg',
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
        image: 'images/home-slider/bath-slide.jpg',
        badge: 'Безкоштовна доставка',
        title: 'Замовлення від 2 000 ₴ — з доставкою 0 ₴',
        text: 'Дбайливо пакуємо та доставляємо по всій Україні. Відстежуйте посилку в особистому кабінеті.',
        ctaLabel: 'Обрати товари',
        ctaTo: '/catalog',
        theme: 'info',
    },
    {
        id: 3,
        image: 'images/home-slider/kitchen-slide.jpg',
        badge: 'Повернення 30 днів',
        title: 'Не сподобалося? Повернемо кошти',
        text: 'Гарантія задоволення: повернення або обмін протягом 30 днів без зайвих питань.',
        ctaLabel: 'Дізнатися більше',
        ctaTo: '/contacts',
        theme: 'success',
    },
]

const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export const MainSlider = () => {
    return (
        <section className="main-slider">
            <Slider {...settings}>
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
            </Slider>
        </section>
    )
}
