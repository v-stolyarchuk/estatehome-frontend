import './CategoryMenu.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { CategorySlug } from '../../../../entities/category'
import { CATEGORIES } from '../../../../entities/category'

export const CategoryMenu = () => {
    const navigate = useNavigate()
    const [openCategory, setOpenCategory] = useState<CategorySlug | null>(null)

    const handleCategoryClick = (slug: CategorySlug) => {
        setOpenCategory((prev) => (prev === slug ? null : slug))
    }

    const handleTagClick = (tag: string) => {
        navigate(`/catalog?q=${encodeURIComponent(tag)}`)
    }

    return (
        <nav className="category-menu" aria-label="Категорії товарів">
            {CATEGORIES.map((category) => {
                const isOpen = openCategory === category.slug
                return (
                    <div key={category.slug} className="category-menu__group">
                        <button
                            type="button"
                            className={`category-menu__category${isOpen ? ' category-menu__category--open' : ''}`}
                            onClick={() => handleCategoryClick(category.slug)}
                            aria-expanded={isOpen}
                        >
                            <span className="category-menu__category-label">{category.label}</span>
                            <span className="category-menu__chevron" aria-hidden="true" />
                        </button>

                        {isOpen && (
                            <div className="category-menu__sublist">
                                <span className="category-menu__sublist-title">Підкатегорії</span>
                                <ul className="category-menu__subs">
                                    {category.subcategories.map((subcategory) => (
                                        <li key={subcategory.slug}>{subcategory.label}</li>
                                    ))}
                                </ul>

                                {category.popularTags && category.popularTags.length > 0 && (
                                    <div className="category-menu__tags">
                                        <span className="category-menu__tags-title">
                                            Популярні запити
                                        </span>
                                        <div className="category-menu__tags-list">
                                            {category.popularTags.map((tag) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    className="category-menu__tag"
                                                    onClick={() => handleTagClick(tag)}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}
