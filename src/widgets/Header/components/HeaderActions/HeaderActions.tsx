import './HeaderActions.scss'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../../../app/hooks'
import { selectCartCount } from '../../../../features/cart/model/cartSlice'
import { selectFavouriteIds } from '../../../../features/favourites/model/favouritesSlice'

export const HeaderActions = () => {
    const cartCount = useAppSelector(selectCartCount)
    const favouritesCount = useAppSelector((state) => selectFavouriteIds(state).length)

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
        </div>
    )
}
