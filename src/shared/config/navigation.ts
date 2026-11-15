export interface NavItem {
    to: string
    label: string
}

export const NAV_ITEMS: NavItem[] = [
    { to: '/', label: 'Головна' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/blog', label: 'Блог' },
    { to: '/contacts', label: 'Контакти' },
]

export const MOBILE_EXTRA_ITEMS: NavItem[] = [
    { to: '/favourites', label: 'Обране' },
    { to: '/cart', label: 'Кошик' },
]
