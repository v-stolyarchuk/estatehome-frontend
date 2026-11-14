import './PageHero.scss'

import type { ReactNode } from 'react'

import { Badge } from '../Badge'

interface PageHeroProps {
    badge: string
    title: string
    subtitle: string
    children?: ReactNode
}

export const PageHero = ({ badge, title, subtitle, children }: PageHeroProps) => {
    return (
        <section className="page-hero">
            <Badge>{badge}</Badge>
            <h1 className="page-hero__title">{title}</h1>
            <p className="page-hero__subtitle">{subtitle}</p>
            {children}
        </section>
    )
}
