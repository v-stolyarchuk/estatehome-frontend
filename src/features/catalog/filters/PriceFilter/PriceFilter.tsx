import './PriceFilter.scss'

import { Input } from '../../../../shared/ui/Input'

interface PriceFilterProps {
    minPrice: number | null
    maxPrice: number | null
    onChange: (min: number | null, max: number | null) => void
}

const parseValue = (value: string): number | null => {
    if (value.trim() === '') {
        return null
    }
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export const PriceFilter = ({ minPrice, maxPrice, onChange }: PriceFilterProps) => {
    return (
        <div className="price-filter" role="group" aria-label="Фільтр за ціною">
            <span className="price-filter__label">Ціна, ₴</span>
            <div className="price-filter__inputs">
                <Input
                    type="number"
                    placeholder="Від"
                    value={minPrice === null ? '' : String(minPrice)}
                    onChange={(value) => onChange(parseValue(value), maxPrice)}
                    ariaLabel="Мінімальна ціна"
                />
                <span className="price-filter__separator" aria-hidden="true">
                    –
                </span>
                <Input
                    type="number"
                    placeholder="До"
                    value={maxPrice === null ? '' : String(maxPrice)}
                    onChange={(value) => onChange(minPrice, parseValue(value))}
                    ariaLabel="Максимальна ціна"
                />
            </div>
        </div>
    )
}
