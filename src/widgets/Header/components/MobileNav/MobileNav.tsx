import './MobileNav.scss'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/', label: 'Головна' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/blog', label: 'Блог' },
    { to: '/contacts', label: 'Контакти' },
    { to: '/favourites', label: 'Обране' },
    { to: '/cart', label: 'Кошик' },
]

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`mobile-nav${isOpen ? ' mobile-nav--open' : ''}`}>
            <button
                type="button"
                className="mobile-nav__burger"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="mobile-nav__burger-line" />
                <span className="mobile-nav__burger-line" />
                <span className="mobile-nav__burger-line" />
            </button>

            <nav className="mobile-nav__panel" aria-hidden={!isOpen}>
                <ul className="mobile-nav__list">
                    {navItems.map(({ to, label }) => (
                        <li key={to} className="mobile-nav__item">
                            <NavLink
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
