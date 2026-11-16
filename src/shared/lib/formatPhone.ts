export const formatPhoneMask = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    let national = digits

    if (national.startsWith('380')) {
        national = national.slice(3)
    } else if (national.startsWith('0')) {
        national = national.slice(1)
    }
    national = national.slice(0, 9)

    if (national.length === 0) {
        return '+380'
    }

    const rest = national.slice(2)
    let result = `+380 (${national.slice(0, 2)}`
    if (rest.length > 0) {
        result += ') '
    }
    result += rest.slice(0, 3)
    if (rest.length > 3) {
        result += `-${rest.slice(3, 5)}`
    }
    if (rest.length > 5) {
        result += `-${rest.slice(5, 7)}`
    }

    return result
}
