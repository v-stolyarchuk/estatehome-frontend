export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
