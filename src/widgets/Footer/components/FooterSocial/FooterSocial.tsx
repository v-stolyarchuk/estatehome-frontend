import './FooterSocial.scss'

import { SOCIAL_LINKS } from '../../../../shared/config/socialLinks'

export const FooterSocial = () => {
    return (
        <div className="footer-social">
            <span className="footer-social__title">Стежте за нами</span>
            <ul className="footer-social__list">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <li key={label} className="footer-social__item">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social__link"
                            aria-label={label}
                            title={label}
                        >
                            <Icon />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
