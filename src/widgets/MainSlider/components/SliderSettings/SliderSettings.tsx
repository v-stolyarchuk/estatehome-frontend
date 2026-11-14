import './SliderSettings.scss'

interface SliderSettingsProps {
    total: number
    activeIndex: number
    onSelect: (index: number) => void
}

export const SliderSettings = ({ total, activeIndex, onSelect }: SliderSettingsProps) => {
    return (
        <div className="slider-settings">
            {Array.from({ length: total }, (_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`slider-settings__dot${index === activeIndex ? ' slider-settings__dot--active' : ''}`}
                    onClick={() => onSelect(index)}
                    aria-label={`Перейти до слайда ${index + 1}`}
                    aria-current={index === activeIndex}
                />
            ))}
        </div>
    )
}
