export const CATEGORY_SLUGS = [
    'home-kitchen',
    'gadgets-energy',
    'auto',
    'beauty-health',
    'pets',
    'kids',
    'home-decor',
    'garden-leisure',
    'tools',
    'hobby-sports',
    'seasonal',
] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export interface SubCategoryDef {
    slug: string
    label: string
}

export interface CategoryDef {
    slug: CategorySlug
    label: string
    image: string
    badge?: string
    description: string
    popularTags?: string[]
    subcategories: SubCategoryDef[]
}

export const CATEGORIES: CategoryDef[] = [
    {
        slug: 'home-kitchen',
        label: 'Дім та кухня',
        image: 'images/categories/home-kitchen.webp',
        badge: 'Хіт продажу',
        description:
            'Органайзери, кухонні помічники та товари для прибирання, які спрощують повсякденність.',
        popularTags: ['Органайзер', 'Кухонний гаджет', 'Швабра', 'Плед'],
        subcategories: [
            { slug: 'organizers', label: 'Органайзери та зберігання' },
            { slug: 'kitchen-gadgets', label: 'Кухонні гаджети та посуд' },
            { slug: 'cleaning', label: 'Товари для прибирання' },
            { slug: 'home-textile', label: 'Домашній текстиль та пледи' },
        ],
    },
    {
        slug: 'gadgets-energy',
        label: 'Гаджети та автономність',
        image: 'images/categories/gadgets.webp',
        badge: 'Топ попит',
        description: 'Павербанки, акумуляторні світильники та корисні гаджети для дому.',
        popularTags: ['Павербанк', 'Акумуляторна лампа', 'Ліхтарик', 'Зарядка'],
        subcategories: [
            { slug: 'powerbanks', label: 'Павербанки та зарядні станції' },
            { slug: 'lighting', label: 'Акумуляторні лампи та ліхтарі' },
            { slug: 'mobile-accessories', label: 'Кабелі, тримачі та зарядки' },
            { slug: 'smart-home', label: 'Розумний дім та датчики' },
        ],
    },
    {
        slug: 'auto',
        label: 'Автотовари',
        image: 'images/categories/auto.webp',
        badge: 'Новинка',
        description: 'Відеореєстратори, органайзери для салону та засоби для догляду за авто.',
        popularTags: ['Відеореєстратор', 'FM-трансмітер', 'Автоорганайзер', 'Компресор'],
        subcategories: [
            { slug: 'auto-electronics', label: 'Відеореєстратори та FM-трансмітери' },
            { slug: 'auto-care', label: 'Автохімія та догляд за салоном' },
            { slug: 'auto-organizers', label: 'Органайзери в багажник та салон' },
            {
                slug: 'emergency-kit',
                label: 'Компресори, пускові пристрої та аптечки',
            },
        ],
    },
    {
        slug: 'beauty-health',
        label: 'Краса та здоровʼя',
        image: 'images/categories/beauty-health.webp',
        badge: 'Вигідно',
        description: 'Стайлери, масажери та аксесуари для щоденного догляду за собою.',
        popularTags: ['Стайлер', 'Масажер', 'Дзеркало з підсвіткою', 'Коректор постави'],
        subcategories: [
            { slug: 'hair-styling', label: 'Фени, стайлери та тримери' },
            { slug: 'massagers', label: 'Масажери для тіла та обличчя' },
            {
                slug: 'cosmetic-organizers',
                label: 'Органайзери для косметики та дзеркала',
            },
            { slug: 'posture-care', label: 'Коректори постави та ортопедія' },
        ],
    },
    {
        slug: 'pets',
        label: 'Товари для тварин',
        image: 'images/categories/pets.webp',
        badge: 'Бестселер',
        description: 'Лежанки, іграшки, грумінг та автогодівниці для ваших улюбленців.',
        popularTags: ['Лежанка', 'Іграшка', 'Фурмінатор', 'Автогодівниця'],
        subcategories: [
            { slug: 'pet-beds', label: 'Лежанки та будиночки' },
            { slug: 'pet-toys', label: 'Іграшки та дряпки' },
            { slug: 'grooming', label: 'Грумінг та догляд за шерстю' },
            { slug: 'feeders', label: 'Автогодівниці та поїлки' },
        ],
    },
    {
        slug: 'kids',
        label: 'Дитячі товари',
        image: 'images/categories/kids.webp',
        badge: 'Новинка',
        description: 'Розвиваючі іграшки, набори для творчості та затишні нічники для дітей.',
        popularTags: ['Конструктор', 'Набір для малювання', 'Нічник', 'Настільна гра'],
        subcategories: [
            {
                slug: 'educational-toys',
                label: 'Розвиваючі іграшки та конструктори',
            },
            { slug: 'creative-sets', label: 'Набори для малювання та творчості' },
            { slug: 'night-lights', label: 'Дитячі нічники та проєктори' },
            { slug: 'board-games', label: 'Настільні ігри' },
        ],
    },
    {
        slug: 'home-decor',
        label: 'Декор та освітлення',
        image: 'images/categories/home-decor.webp',
        badge: 'Топ попит',
        description: 'LED-декор, аромадифузори, свічки та предмети для затишного інтерʼєру.',
        popularTags: ['LED-стрічка', 'Аромадифузор', 'Свічка', 'Картина'],
        subcategories: [
            { slug: 'led-decor', label: 'LED-стрічки, гірлянди та неон' },
            {
                slug: 'aroma',
                label: 'Аромадифузори та зволожувачі повітря',
            },
            { slug: 'wall-decor', label: 'Годинники, картини та наклейки' },
            { slug: 'candles', label: 'Свічки та підсвічники' },
        ],
    },
    {
        slug: 'garden-leisure',
        label: 'Сад, город та пікнік',
        image: 'images/categories/garden-leisure.webp',
        badge: 'Сезонна пропозиція',
        description:
            'Сонячні ліхтарі, шланги для поливу та все для комфортного відпочинку на природі.',
        popularTags: ['Сонячний ліхтар', 'Шланг для поливу', 'Мангал', 'Відлякувач шкідників'],
        subcategories: [
            {
                slug: 'solar-lights',
                label: 'Садові ліхтарі на сонячних батареях',
            },
            { slug: 'watering', label: 'Шланги та системи поливу' },
            {
                slug: 'bbq-picnic',
                label: 'Товари для пікніка, мангали та термосумки',
            },
            { slug: 'pest-control', label: 'Відлякувачі шкідників та пастки' },
        ],
    },
    {
        slug: 'tools',
        label: 'Інструменти',
        image: 'images/categories/tools.webp',
        badge: 'Хіт продажу',
        description: 'Шуруповерти, набори інструментів, лазерні рівні та робоче освітлення.',
        popularTags: ['Шуруповерт', 'Лазерний рівень', 'Набір інструментів', 'Налобний ліхтар'],
        subcategories: [
            { slug: 'hand-tools', label: 'Набори ручних інструментів' },
            { slug: 'cordless-tools', label: 'Шуруповерти та міні-пили' },
            { slug: 'measuring', label: 'Лазерні рівні та рулетки' },
            { slug: 'work-lights', label: 'Налобні ліхтарі та прожектори' },
        ],
    },
    {
        slug: 'hobby-sports',
        label: 'Спорт, туризм та хобі',
        image: 'images/categories/hobby-sports.webp',
        badge: 'Для активних',
        description: 'Товари для домашнього фітнесу, кемпінгу, риболовлі та активного відпочинку.',
        popularTags: ['Килимок для йоги', 'Термос', 'Ящик для риболовлі', 'Еспандери'],
        subcategories: [
            { slug: 'fitness', label: 'Фітнес та домашні тренування' },
            { slug: 'fishing', label: 'Риболовля та спорядження' },
            { slug: 'camping', label: 'Кемпінг, термоси та туризм' },
            { slug: 'hobby-diy', label: 'Хобі, моделювання та головоломки' },
        ],
    },
    {
        slug: 'seasonal',
        label: 'Сезонні товари',
        image: 'images/categories/seasonal.webp',
        badge: 'За сезоном',
        description:
            'Термобілизна, вентилятори, святковий декор — все для комфорту в будь-яку пору року.',
        popularTags: ['Електропростирадло', 'Міні-вентилятор', 'Святковий декор', 'Грілка'],
        subcategories: [
            {
                slug: 'winter-warmth',
                label: 'Термобілизна, грілки та електропростирадла',
            },
            {
                slug: 'summer-cooling',
                label: 'Міні-вентилятори, басейни та захист від сонця',
            },
            { slug: 'holiday-decor', label: 'Новорічний та святковий декор' },
        ],
    },
]

export const getCategoryLabel = (slug: string): string =>
    CATEGORIES.find((category) => category.slug === slug)?.label ?? slug
