import './HeaderActions.scss'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FiHeart, FiMoon, FiShoppingCart, FiSun } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../../app/hooks'
import { selectCartCount } from '../../../../features/cart/model/cartSlice'
import { selectFavouriteIds } from '../../../../features/favourites/model/favouritesSlice'
import { toggleTheme, useTheme } from '../../../../shared/lib'

export const HeaderActions = () => {
    const cartCount = useAppSelector(selectCartCount)
    const favouritesCount = useAppSelector((state) => selectFavouriteIds(state).length)
    const theme = useTheme()

    return (
        <div className="header-actions">
            <NavLink
                to="/favourites"
                className={({ isActive }) =>
                    `header-actions__link${isActive ? ' header-actions__link--active' : ''}`
                }
                aria-label="Обране"
                title="Обране"
            >
                {({ isActive }) => (
                    <>
                        {isActive ? <FaHeart /> : <FiHeart />}
                        {favouritesCount > 0 && (
                            <span className="header-actions__badge">{favouritesCount}</span>
                        )}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/cart"
                className={({ isActive }) =>
                    `header-actions__link${isActive ? ' header-actions__link--active' : ''}`
                }
                aria-label="Кошик"
                title="Кошик"
            >
                {({ isActive }) => (
                    <>
                        {isActive ? <FaShoppingCart /> : <FiShoppingCart />}
                        {cartCount > 0 && (
                            <span className="header-actions__badge">{cartCount}</span>
                        )}
                    </>
                )}
            </NavLink>
            <button
                type="button"
                className="header-actions__link"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Світла тема' : 'Темна тема'}
                title={theme === 'dark' ? 'Світла тема' : 'Темна тема'}
            >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
        </div>
    )
}
