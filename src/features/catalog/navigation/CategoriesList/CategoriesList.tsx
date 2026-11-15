import './CategoriesList.scss'

import type { IconType } from 'react-icons'
import { FaCarSide, FaPaw, FaSeedling } from 'react-icons/fa'
import {
    FiActivity,
    FiCalendar,
    FiGift,
    FiHome,
    FiSmile,
    FiSun,
    FiTool,
    FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

import type { CategorySlug } from '../../../../entities/category'
import { CATEGORIES } from '../../../../entities/category'

const CATEGORY_ICONS: Record<CategorySlug, IconType> = {
    'home-kitchen': FiHome,
    'gadgets-energy': FiZap,
    auto: FaCarSide,
    'beauty-health': FiSmile,
    pets: FaPaw,
    kids: FiGift,
    'home-decor': FiSun,
    'garden-leisure': FaSeedling,
    tools: FiTool,
    'hobby-sports': FiActivity,
    seasonal: FiCalendar,
}

export const CategoriesList = () => {
    return (
        <section className="categories-list" aria-label="Категорії товарів">
            <h2 className="categories-list__title">Категорії</h2>
            <div className="categories-list__grid">
                {CATEGORIES.map((category) => {
                    const Icon = CATEGORY_ICONS[category.slug]
                    return (
                        <Link
                            key={category.slug}
                            to={`/catalog?category=${category.slug}`}
                            className="categories-list__card"
                        >
                            <span className="categories-list__icon" aria-hidden="true">
                                <Icon />
                            </span>
                            <span className="categories-list__label">{category.label}</span>
                            <span className="categories-list__description">
                                {category.description}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
