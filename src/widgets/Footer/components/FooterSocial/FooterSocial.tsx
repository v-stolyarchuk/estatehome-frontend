import './FooterSocial.scss'

const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com/estatehome' },
    { label: 'Instagram', href: 'https://instagram.com/estatehome' },
    { label: 'X', href: 'https://x.com/estatehome' },
    { label: 'YouTube', href: 'https://youtube.com/@estatehome' },
]

export const FooterSocial = () => {
    return (
        <div className="footer-social">
            <span className="footer-social__title">Стежте за нами</span>
            <ul className="footer-social__list">
                {socialLinks.map(({ label, href }) => (
                    <li key={label} className="footer-social__item">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social__link"
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
