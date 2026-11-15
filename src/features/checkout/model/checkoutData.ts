import type { DeliveryMethod } from './checkout.types'

export interface DeliveryMethodOption {
    value: DeliveryMethod
    label: string
}

export const DELIVERY_METHODS: DeliveryMethodOption[] = [
    { value: 'nova-poshta', label: 'Нова Пошта' },
    { value: 'ukrposhta', label: 'Укрпошта' },
    { value: 'courier', label: 'Кур’єрська доставка' },
    { value: 'pickup', label: 'Самовивіз' },
]

export const getDeliveryMethodLabel = (method: DeliveryMethod): string => {
    return DELIVERY_METHODS.find((option) => option.value === method)?.label ?? method
}
