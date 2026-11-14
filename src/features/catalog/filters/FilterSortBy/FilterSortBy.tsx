import './FilterSortBy.scss'

import type { CatalogSort } from '../../model/catalog.types'

interface FilterSortByProps {
    value: CatalogSort
    onChange: (sort: CatalogSort) => void
}

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
    { value: 'featured', label: 'За замовчуванням' },
    { value: 'newest', label: 'Спочатку нові' },
    { value: 'price-asc', label: 'Ціна: від дешевих' },
    { value: 'price-desc', label: 'Ціна: від дорогих' },
    { value: 'name-asc', label: 'Назва: А–Я' },
    { value: 'name-desc', label: 'Назва: Я–А' },
]

export const FilterSortBy = ({ value, onChange }: FilterSortByProps) => {
    return (
        <label className="filter-sort-by">
            <span className="filter-sort-by__label">Сортування</span>
            <select
                className="filter-sort-by__select"
                value={value}
                onChange={(event) => onChange(event.target.value as CatalogSort)}
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}
