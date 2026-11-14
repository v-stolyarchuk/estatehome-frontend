import './HeaderLogo.scss'

import { Link } from 'react-router-dom'

export const HeaderLogo = () => {
    return (
        <Link to="/" className="header-logo">
            <span className="header-logo__icon" aria-hidden="true">
                🏠
            </span>
            <span className="header-logo__title">EstateHome</span>
        </Link>
    )
}
