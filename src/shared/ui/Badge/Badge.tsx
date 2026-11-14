import './Badge.scss'

import type { ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'danger'

interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
}

export const Badge = ({ children, variant = 'primary' }: BadgeProps) => {
    return <span className={`badge badge--${variant}`}>{children}</span>
}
