import './Footer.scss'

import { Link } from 'react-router-dom'

import { FooterBottom } from './components/FooterBottom'
import { FooterSection } from './components/FooterSection'
import { FooterSocial } from './components/FooterSocial'

const sections = [
    {
        title: 'Магазин',
        links: [
            { label: 'Каталог', to: '/catalog' },
            { label: 'Обране', to: '/favourites' },
            { label: 'Кошик', to: '/cart' },
        ],
    },
    {
        title: 'Компанія',
        links: [
            { label: 'Блог', to: '/blog' },
            { label: 'Контакти', to: '/contacts' },
        ],
    },
    {
        title: 'Підтримка',
        links: [{ label: 'Контакти', to: '/contacts' }],
    },
]

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        EstateHome
                    </Link>
                    <p className="footer__tagline">Все для вашого дому в одному місці.</p>
                </div>

                <div className="footer__sections">
                    {sections.map((section) => (
                        <FooterSection
                            key={section.title}
                            title={section.title}
                            links={section.links}
                        />
                    ))}
                </div>

                <FooterSocial />
                <FooterBottom />
            </div>
        </footer>
    )
}
