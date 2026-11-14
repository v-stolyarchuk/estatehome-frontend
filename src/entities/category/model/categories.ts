export const CATEGORY_SLUGS = [
    'garden',
    'auto',
    'pets',
    'kids',
    'home-decor',
    'seasonal',
    'tools',
] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export interface CategoryDef {
    slug: CategorySlug
    label: string
}

export const CATEGORIES: CategoryDef[] = [
    { slug: 'garden', label: 'Сад і город' },
    { slug: 'auto', label: 'Авто' },
    { slug: 'pets', label: 'Товари для тварин' },
    { slug: 'kids', label: 'Дитячі товари' },
    { slug: 'home-decor', label: 'Декор' },
    { slug: 'seasonal', label: 'Сезонні товари' },
    { slug: 'tools', label: 'Інструменти' },
]

export const getCategoryLabel = (slug: string): string =>
    CATEGORIES.find((category) => category.slug === slug)?.label ?? slug
