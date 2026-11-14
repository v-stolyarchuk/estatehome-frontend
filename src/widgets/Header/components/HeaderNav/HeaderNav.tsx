import './HeaderNav.scss'

import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/', label: 'Головна' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/blog', label: 'Блог' },
    { to: '/contacts', label: 'Контакти' },
]

export const HeaderNav = () => {
    return (
        <nav className="header-nav">
            <ul className="header-nav__list">
                {navItems.map(({ to, label }) => (
                    <li key={to} className="header-nav__item">
                        <NavLink
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `header-nav__link${isActive ? ' header-nav__link--active' : ''}`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
