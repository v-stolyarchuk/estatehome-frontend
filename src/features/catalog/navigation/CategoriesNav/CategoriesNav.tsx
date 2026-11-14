import './CategoriesNav.scss'

import { getCategoryLabel } from '../../../../entities/category'

interface CategoriesNavProps {
    categories: string[]
    selectedCategories: string[]
    onSelect: (category: string | null) => void
}

export const CategoriesNav = ({ categories, selectedCategories, onSelect }: CategoriesNavProps) => {
    const isAllActive = selectedCategories.length === 0

    return (
        <nav className="categories-nav" aria-label="Категорії товарів">
            <button
                type="button"
                className={`categories-nav__link${isAllActive ? ' categories-nav__link--active' : ''}`}
                onClick={() => onSelect(null)}
                aria-pressed={isAllActive}
            >
                Усі
            </button>
            {categories.map((category) => {
                const isActive =
                    selectedCategories.length === 1 && selectedCategories[0] === category
                return (
                    <button
                        key={category}
                        type="button"
                        className={`categories-nav__link${isActive ? ' categories-nav__link--active' : ''}`}
                        onClick={() => onSelect(category)}
                        aria-pressed={isActive}
                    >
                        {getCategoryLabel(category)}
                    </button>
                )
            })}
        </nav>
    )
}
