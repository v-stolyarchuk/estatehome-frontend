import './SliderSlide.scss'

import { Button } from '../../../../shared/ui/Button'

interface SliderSlideProps {
    image: string
    badge?: string
    title: string
    text: string
    highlight?: string
    ctaLabel: string
    ctaTo: string
}

export const SliderSlide = ({
    image,
    badge,
    title,
    text,
    highlight,
    ctaLabel,
    ctaTo,
}: SliderSlideProps) => {
    return (
        <div className="slider-slide">
            <div className="slider-slide__content">
                {badge && <span className="slider-slide__badge">{badge}</span>}
                <h2 className="slider-slide__title">{title}</h2>
                <p className="slider-slide__text">{text}</p>
                {highlight && <span className="slider-slide__highlight">{highlight}</span>}
                <Button to={ctaTo} className="slider-slide__cta">
                    {ctaLabel}
                </Button>
            </div>
            <div className="slider-slide__media">
                <img className="slider-slide__image" src={image} alt="" />
            </div>
        </div>
    )
}
