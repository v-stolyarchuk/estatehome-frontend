import './Header.scss'

import { HeaderActions } from './components/HeaderActions'
import { HeaderLogo } from './components/HeaderLogo'
import { HeaderNav } from './components/HeaderNav'
import { MobileNav } from './components/MobileNav'

export const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <HeaderLogo />
                <HeaderNav />
                <div className="header__actions-group">
                    <HeaderActions />
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}
