import type { Partner } from './partner.types'

export const partnersData: Partner[] = [
    {
        id: 1,
        name: 'SwiftMove Delivery',
        description:
            'Надійна доставка меблів і посилок з дбайливим поводженням та відстеженням у реальному часі.',
        website: 'https://swiftmove.example.com',
        services: ['Доставка меблів', 'Доставка того ж дня', 'Доставка та встановлення'],
        referralDiscount: 10,
    },
    {
        id: 2,
        name: 'SweetCraft Cakes',
        description:
            'Торти на замовлення для будь-якої події — весілля, дні народження та корпоративи.',
        website: 'https://sweetcraft.example.com',
        services: ['Дизайн тортів на замовлення', 'Корпоративні замовлення', 'Десертні столи'],
        referralDiscount: 15,
    },
    {
        id: 3,
        name: 'LearnHub Online',
        description: 'Живі та записані курси з дизайну, мов і професійних навичок.',
        website: 'https://learnhub.example.com',
        services: ['Індивідуальні заняття', 'Групові курси', 'Корпоративне навчання'],
        referralDiscount: 20,
    },
    {
        id: 4,
        name: 'HomeFix Pros',
        description: 'Команда сертифікованих фахівців для ремонту, складання та робіт по дому.',
        website: 'https://homefix.example.com',
        services: ['Сантехніка та електрика', 'Збирання меблів', 'Ремонт'],
        referralDiscount: 10,
    },
]
