import './BlogPage.scss'

import { useState } from 'react'
import type { IconType } from 'react-icons'
import { FiFeather, FiHome, FiTruck } from 'react-icons/fi'

import { formatDate } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { Modal } from '../../shared/ui/Modal'
import { PageHero } from '../../shared/ui/PageHero'

interface BlogPost {
    id: number
    icon: IconType
    tag: string
    title: string
    excerpt: string
    content: string[]
    date: string
    readTime: string
}

const posts: BlogPost[] = [
    {
        id: 1,
        icon: FiHome,
        tag: 'Інтерʼєр',
        title: 'Як обрати ідеальний диван для маленької квартири',
        excerpt:
            'Поради щодо економії простору, гіди з тканин і ідеї планування, які зроблять компактну вітальню просторішою та затишнішою.',
        content: [
            'У маленькій квартирі кожен предмет меблів має працювати на результат. Диван — це не лише місце для відпочинку, а й часто головний елемент вітальні, тому до його вибору варто підійти уважно.',
            'Перед покупкою обовʼязково виміряйте не лише ширину кімнати, а й ширину дверних прорізів, сходових площадок і поворотів — саме там найчастіше виникають проблеми з доставкою громіздких меблів.',
            'Для невеликих просторів ідеально підходять дивани з високими ніжками: вони візуально полегшують меблі, а пилосос під ними проходить без перешкод. Модулі, що розкладаються, додадуть функціональності без зайвих габаритів.',
            'Звертайте увагу на тканину: для щоденного використання краще обирати щільні, легкі в чищенні матеріали з просоченням. Світлі відтінки візуально розширюють простір, а акцентна подушка або плед додасть характеру.',
        ],
        date: '2025-11-02',
        readTime: '5 хв читання',
    },
    {
        id: 2,
        icon: FiTruck,
        tag: 'Доставка',
        title: 'Що варто знати перед днем доставки меблів',
        excerpt:
            'Підготовка дверних прорізів, заміри ліфтів і перевірка пакування — чеклист для безперешкодної доставки без пошкоджень.',
        content: [
            'Доставка меблів — це відповідальний етап, від якого залежить, чи дійде замовлення у ідеальному стані. Кілька простих кроків підготовки зроблять день отримання значно спокійнішим.',
            'Заздалегідь перевірте ширину дверей, висоту дверних прорізів і наявність вільного проходу до кімнати. Якщо вантаж доводиться підіймати на поверх, уточніть габарити ліфта, сходів і міжповерхових площадок.',
            'Підготуйте мʼяке покриття для підлоги та захистіть кути меблів пакувальним матеріалом до винесення з квартири. Це збереже ремонт і позбавить зайвих турбот.',
            'У день доставки обовʼязково огляньте упаковку та сам товар на наявність пошкоджень і зафіксуйте їх разом із курʼєром — так гарантійні випадки вирішуються значно швидше.',
        ],
        date: '2025-10-21',
        readTime: '4 хв читання',
    },
    {
        id: 3,
        icon: FiFeather,
        tag: 'Догляд',
        title: 'Прості звички, які збережуть деревʼяні меблі новими',
        excerpt:
            'Рутини прибирання, поради щодо вологості та дрібні виправлення, які захистять ваші деревʼяні вироби на роки.',
        content: [
            'Деревʼяні меблі служать десятиліттями, якщо за ними правильно доглядати. Більшість проблем — подряпини, помутніння лаку та розтріскування — можна уникнути регулярними простими процедурами.',
            'Протирайте поверхні мʼякою мікрофібровою тканиною без надмірної вологи. Для регулярного догляду достатньо теплої води з кількома краплями мʼякого засобу для дерева.',
            'Уникайте різких перепадів температури та прямого сонячного світла — вони сушать деревину й призводять до розтріскування та зміни кольору. Узимку корисно підтримувати стабільну вологість у приміщенні.',
            'Дрібні подряпини можна замаскувати спеціальними олівцями або воском у колір деревини. Профілактичне оновлення лаку раз на кілька років значно продовжить життя улюблених меблів.',
        ],
        date: '2025-10-08',
        readTime: '6 хв читання',
    },
]

export const BlogPage = () => {
    const [activePost, setActivePost] = useState<BlogPost | null>(null)

    return (
        <div className="blog-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Блог' }]} />
            <PageHero
                badge="Наш блог"
                title="Ідеї та натхнення для вашого дому"
                subtitle="Поради, гайди та історії, які допоможуть обрати, прикрасити та подбати про ваші меблі."
            />

            <section className="blog-page__posts">
                {posts.map((post) => {
                    const Icon = post.icon
                    return (
                        <article key={post.id} className="blog-page__post">
                            <div className="blog-page__post-image">
                                <span className="blog-page__post-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                            </div>
                            <div className="blog-page__post-body">
                                <span className="blog-page__post-tag">{post.tag}</span>
                                <h2 className="blog-page__post-title">{post.title}</h2>
                                <p className="blog-page__post-excerpt">{post.excerpt}</p>
                                <div className="blog-page__post-meta">
                                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                                    <span>{post.readTime}</span>
                                </div>
                                <Button
                                    size="sm"
                                    className="blog-page__post-button"
                                    onClick={() => setActivePost(post)}
                                >
                                    Читати далі
                                </Button>
                            </div>
                        </article>
                    )
                })}
            </section>

            <Modal isOpen={activePost !== null} onClose={() => setActivePost(null)}>
                {activePost && (
                    <article className="blog-page__modal">
                        <span className="blog-page__modal-tag">{activePost.tag}</span>
                        <h2 className="blog-page__modal-title">{activePost.title}</h2>
                        <div className="blog-page__modal-meta">
                            <time dateTime={activePost.date}>{formatDate(activePost.date)}</time>
                            <span>{activePost.readTime}</span>
                        </div>
                        {activePost.content.map((paragraph) => (
                            <p key={paragraph.slice(0, 30)} className="blog-page__modal-text">
                                {paragraph}
                            </p>
                        ))}
                    </article>
                )}
            </Modal>
        </div>
    )
}
