import './ContactsPage.scss'

import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { PageHero } from '../../shared/ui/PageHero'

const contactItems = [
    {
        icon: '📞',
        title: 'Телефон',
        text: '+380 (44) 123-45-67',
        href: 'tel:+380441234567',
    },
    {
        icon: '✉️',
        title: 'Електронна пошта',
        text: 'hello@estatehome.com',
        href: 'mailto:hello@estatehome.com',
    },
    {
        icon: '📍',
        title: 'Адреса',
        text: 'Київ, вул. Хрещатик, 22',
        href: 'https://www.openstreetmap.org/?mlat=50.4501&mlon=30.5234#map=15/50.4501/30.5234',
    },
    {
        icon: '🕒',
        title: 'Години роботи',
        text: 'Пн–Пт: 9:00–18:00, Сб: 10:00–16:00',
    },
]

const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/estatehome' },
    { label: 'Instagram', href: 'https://www.instagram.com/estatehome' },
    { label: 'X', href: 'https://x.com/estatehome' },
    { label: 'YouTube', href: 'https://www.youtube.com/@estatehome' },
]

const MAP_EMBED_URL =
    'https://www.openstreetmap.org/export/embed.html?bbox=30.50%2C50.44%2C30.55%2C50.46&layer=mapnik&marker=50.4501%2C30.5234'

export function ContactsPage() {
    return (
        <div className="contacts-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Контакти' }]} />
            <PageHero
                badge="Ми завжди на зв'язку"
                title="Зв'яжіться з нами"
                subtitle="Маєте запитання щодо замовлення чи товару? Напишіть нам — наша команда зазвичай відповідає протягом одного робочого дня."
            />

            <section className="contacts-page__content">
                <div className="contacts-page__info">
                    {contactItems.map(({ icon, title, text, href }) => (
                        <article key={title} className="contacts-page__card">
                            <span className="contacts-page__card-icon">{icon}</span>
                            <h2 className="contacts-page__card-title">{title}</h2>
                            {href ? (
                                <a
                                    className="contacts-page__card-text contacts-page__card-text--link"
                                    href={href}
                                    {...(href.startsWith('http')
                                        ? {
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                          }
                                        : {})}
                                >
                                    {text}
                                </a>
                            ) : (
                                <p className="contacts-page__card-text">{text}</p>
                            )}
                        </article>
                    ))}

                    <div className="contacts-page__socials">
                        <h2 className="contacts-page__socials-title">Стежте за нами</h2>
                        <div className="contacts-page__socials-list">
                            {socialLinks.map(({ label, href }) => (
                                <a
                                    key={label}
                                    className="contacts-page__social"
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="contacts-page__map">
                    <iframe
                        className="contacts-page__map-frame"
                        src={MAP_EMBED_URL}
                        title="Розташування EstateHome на карті"
                        loading="lazy"
                    />
                </div>
            </section>
        </div>
    )
}
