import './HeaderNav.scss'

import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '../../../../shared/config/navigation'

export const HeaderNav = () => {
    return (
        <nav className="header-nav">
            <ul className="header-nav__list">
                {NAV_ITEMS.map(({ to, label }) => (
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
