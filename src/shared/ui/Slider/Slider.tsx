import './Slider.scss'

import type { ReactNode } from 'react'
import { useRef } from 'react'

interface SliderProps {
    children: ReactNode
    className?: string
}

export const Slider = ({ children, className = '' }: SliderProps) => {
    const trackRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: -1 | 1) => {
        const track = trackRef.current
        if (!track) {
            return
        }
        track.scrollBy({
            left: direction * track.clientWidth * 0.8,
            behavior: 'smooth',
        })
    }

    return (
        <div className={`slider${className ? ` ${className}` : ''}`}>
            <button
                type="button"
                className="slider__arrow slider__arrow--prev"
                onClick={() => scroll(-1)}
                aria-label="Попередній"
            >
                ‹
            </button>
            <div className="slider__track" ref={trackRef}>
                {children}
            </div>
            <button
                type="button"
                className="slider__arrow slider__arrow--next"
                onClick={() => scroll(1)}
                aria-label="Наступний"
            >
                ›
            </button>
        </div>
    )
}
