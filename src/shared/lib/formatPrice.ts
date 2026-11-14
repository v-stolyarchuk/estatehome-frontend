export const formatPrice = (price: number): string => {
    return `₴${price.toLocaleString('uk-UA')}`
}
