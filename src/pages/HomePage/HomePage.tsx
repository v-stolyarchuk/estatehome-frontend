import './HomePage.scss'

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { CATEGORIES } from '../../entities/category'
import { CategoriesNav } from '../../features/catalog/navigation/CategoriesNav'
import { CategoryMenu } from '../../features/catalog/navigation/CategoryMenu'
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
    const navigate = useNavigate()
    const categories = useMemo(() => CATEGORIES.map((category) => category.slug), [])

    const handleSelectCategory = (category: string | null) => {
        navigate(category ? `/catalog?category=${category}` : '/catalog')
    }

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

            <CategoriesNav
                categories={categories}
                selectedCategories={[]}
                onSelect={handleSelectCategory}
            />

            <CategoryMenu />

            <section className="home-page__features">
                {features.map(({ icon, title, text }) => (
                    <article key={title} className="home-page__feature">
                        <span className="home-page__feature-icon">{icon}</span>
                        <h3 className="home-page__feature-title">{title}</h3>
                        <p className="home-page__feature-text">{text}</p>
                    </article>
                ))}
            </section>

            <section className="home-page__cta">
                <h2 className="home-page__cta-title">Готові знайти щось для себе?</h2>
                <Button to="/catalog">Переглянути каталог</Button>
            </section>
        </div>
    )
}
