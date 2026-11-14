import './BlogPage.scss'

import { formatDate } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { PageHero } from '../../shared/ui/PageHero'

const posts = [
    {
        id: 1,
        icon: '🛋️',
        tag: 'Інтерʼєр',
        title: 'Як обрати ідеальний диван для маленької квартири',
        excerpt:
            'Поради щодо економії простору, гіди з тканин і ідеї планування, які зроблять компактну вітальню просторішою та затишнішою.',
        date: '2025-11-02',
        readTime: '5 хв читання',
    },
    {
        id: 2,
        icon: '📦',
        tag: 'Доставка',
        title: 'Що варто знати перед днем доставки меблів',
        excerpt:
            'Підготовка дверних прорізів, заміри ліфтів і перевірка пакування — чеклист для безперешкодної доставки без пошкоджень.',
        date: '2025-10-21',
        readTime: '4 хв читання',
    },
    {
        id: 3,
        icon: '🌿',
        tag: 'Догляд',
        title: 'Прості звички, які збережуть деревʼяні меблі новими',
        excerpt:
            'Рутини прибирання, поради щодо вологості та дрібні виправлення, які захистять ваші деревʼяні вироби на роки.',
        date: '2025-10-08',
        readTime: '6 хв читання',
    },
]

export const BlogPage = () => {
    return (
        <div className="blog-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Блог' }]} />
            <PageHero
                badge="Наш блог"
                title="Ідеї та натхнення для вашого дому"
                subtitle="Поради, гайди та історії, які допоможуть обрати, прикрасити та подбати про ваші меблі."
            />

            <section className="blog-page__posts">
                {posts.map(({ id, icon, tag, title, excerpt, date, readTime }) => (
                    <article key={id} className="blog-page__post">
                        <div className="blog-page__post-image">
                            <span className="blog-page__post-icon">{icon}</span>
                        </div>
                        <div className="blog-page__post-body">
                            <span className="blog-page__post-tag">{tag}</span>
                            <h2 className="blog-page__post-title">{title}</h2>
                            <p className="blog-page__post-excerpt">{excerpt}</p>
                            <div className="blog-page__post-meta">
                                <time dateTime={date}>{formatDate(date)}</time>
                                <span>{readTime}</span>
                            </div>
                            <Button size="sm">Читати далі</Button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    )
}
