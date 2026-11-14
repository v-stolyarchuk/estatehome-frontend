import './HomePage.scss'

import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { CATEGORIES } from '../../entities/category'
import { selectProducts } from '../../entities/product'
import { pluralize } from '../../shared/lib'
import { Button } from '../../shared/ui/Button'
import { PageHero } from '../../shared/ui/PageHero'
import { MainSlider } from '../../widgets/MainSlider'

const features = [
    {
        icon: '🚚',
        title: 'Швидка доставка',
        text: 'Безкоштовна доставка при замовленні від 2 000 ₴',
    },
    {
        icon: '🛡️',
        title: 'Безпечна оплата',
        text: 'Ваші платежі захищені та зашифровані',
    },
    {
        icon: '↩️',
        title: 'Легке повернення',
        text: 'Гарантія повернення коштів протягом 30 днів',
    },
]

export const HomePage = () => {
    const products = useAppSelector(selectProducts)

    const categories = useMemo(
        () =>
            CATEGORIES.map(({ slug, label }) => ({
                slug,
                label,
                count: products.filter((product) => product.category === slug).length,
            })),
        [products],
    )

    return (
        <div className="home-page">
            <MainSlider />

            <PageHero
                badge="Нова колекція сезону"
                title="Все для вашого дому в одному місці"
                subtitle="Відкрийте для себе якісні товари з швидкою доставкою та легким поверненням."
            >
                <div className="home-page__actions">
                    <Button to="/catalog">Купити зараз</Button>
                    <Button to="/catalog" variant="secondary">
                        Переглянути каталог
                    </Button>
                </div>
            </PageHero>

            <section className="home-page__features">
                {features.map(({ icon, title, text }) => (
                    <article key={title} className="home-page__feature">
                        <span className="home-page__feature-icon">{icon}</span>
                        <h3 className="home-page__feature-title">{title}</h3>
                        <p className="home-page__feature-text">{text}</p>
                    </article>
                ))}
            </section>

            <section className="home-page__categories">
                <h2 className="home-page__section-title">Популярні категорії</h2>
                <div className="home-page__category-list">
                    {categories.map(({ slug, label, count }) => (
                        <Link key={slug} to="/catalog" className="home-page__category">
                            <span className="home-page__category-name">{label}</span>
                            <span className="home-page__category-count">
                                {count} {pluralize(count, ['товар', 'товари', 'товарів'])}
                            </span>
                            <span className="home-page__category-arrow" aria-hidden="true">
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="home-page__cta">
                <h2 className="home-page__cta-title">Готові знайти щось для себе?</h2>
                <Button to="/catalog">Переглянути каталог</Button>
            </section>
        </div>
    )
}
