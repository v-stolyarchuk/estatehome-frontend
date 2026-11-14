import './Button.scss'

import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
export type ButtonSize = 'md' | 'sm'

interface ButtonProps {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    to?: string
    type?: 'button' | 'submit'
    disabled?: boolean
    onClick?: (event: MouseEvent) => void
    className?: string
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    type = 'button',
    disabled = false,
    onClick,
    className = '',
}: ButtonProps) => {
    const classes = `button button--${variant} button--${size}${className ? ` ${className}` : ''}`

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} className={classes} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
