import './FooterSection.scss'

import { Link } from 'react-router-dom'

interface FooterLink {
    label: string
    to: string
}

interface FooterSectionProps {
    title: string
    links: FooterLink[]
}

export const FooterSection = ({ title, links }: FooterSectionProps) => {
    return (
        <div className="footer-section">
            <h3 className="footer-section__title">{title}</h3>
            <ul className="footer-section__list">
                {links.map(({ label, to }) => (
                    <li key={`${title}-${to}`} className="footer-section__item">
                        <Link to={to} className="footer-section__link">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
