export type DeliveryMethod = 'nova-poshta' | 'ukrposhta' | 'courier' | 'pickup'

export interface CheckoutFormData {
    fullName: string
    phone: string
    email: string
    city: string
    deliveryMethod: DeliveryMethod
    address: string
    comment: string
}
