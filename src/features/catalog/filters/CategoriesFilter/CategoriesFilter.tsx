import './CategoriesFilter.scss'

import { getCategoryLabel } from '../../../../entities/category'

interface CategoriesFilterProps {
    categories: string[]
    selectedCategories: string[]
    onToggle: (category: string) => void
}

export const CategoriesFilter = ({
    categories,
    selectedCategories,
    onToggle,
}: CategoriesFilterProps) => {
    return (
        <div className="categories-filter" role="group" aria-label="Фільтр за категорією">
            {categories.map((category) => {
                const isActive = selectedCategories.includes(category)
                return (
                    <button
                        key={category}
                        type="button"
                        className={`categories-filter__category${isActive ? ' categories-filter__category--active' : ''}`}
                        onClick={() => onToggle(category)}
                        aria-pressed={isActive}
                    >
                        {getCategoryLabel(category)}
                    </button>
                )
            })}
        </div>
    )
}
