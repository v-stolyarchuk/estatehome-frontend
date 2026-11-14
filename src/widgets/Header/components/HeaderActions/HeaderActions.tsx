import './HeaderActions.scss'

import { NavLink } from 'react-router-dom'

export const HeaderActions = () => {
    return (
        <div className="header-actions">
            <NavLink
                to="/favourites"
                className={({ isActive }) =>
                    `header-actions__link${isActive ? ' header-actions__link--active' : ''}`
                }
            >
                Обране
            </NavLink>
            <NavLink
                to="/cart"
                className={({ isActive }) =>
                    `header-actions__link${isActive ? ' header-actions__link--active' : ''}`
                }
            >
                Кошик
            </NavLink>
        </div>
    )
}
