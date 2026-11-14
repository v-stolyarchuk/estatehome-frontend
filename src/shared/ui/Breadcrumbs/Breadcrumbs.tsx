import './Breadcrumbs.scss'

import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
    label: string
    to?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="breadcrumbs" aria-label="Навігаційний ланцюжок">
            <ol className="breadcrumbs__list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <li key={`${item.label}-${index}`} className="breadcrumbs__item">
                            {item.to && !isLast ? (
                                <Link to={item.to} className="breadcrumbs__link">
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={`breadcrumbs__current${isLast ? ' breadcrumbs__current--active' : ''}`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span className="breadcrumbs__separator" aria-hidden="true">
                                    ›
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
