import './FilterSearch.scss'

import { Input } from '../../../../shared/ui/Input'

interface FilterSearchProps {
    value: string
    onChange: (value: string) => void
}

export const FilterSearch = ({ value, onChange }: FilterSearchProps) => {
    return (
        <div className="filter-search">
            <span className="filter-search__icon" aria-hidden="true">
                🔍
            </span>
            <Input
                type="search"
                placeholder="Пошук товарів..."
                value={value}
                onChange={onChange}
                ariaLabel="Пошук товарів"
            />
        </div>
    )
}
