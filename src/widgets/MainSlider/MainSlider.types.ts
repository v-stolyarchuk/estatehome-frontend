export type SlideTheme = 'primary' | 'info' | 'success'

export interface Slide {
    id: number
    image: string
    badge?: string
    title: string
    text: string
    highlight?: string
    ctaLabel: string
    ctaTo: string
    theme: SlideTheme
}
