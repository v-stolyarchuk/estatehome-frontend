import './Input.scss'

import type { FocusEvent, KeyboardEvent } from 'react'

interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: 'text' | 'search' | 'email' | 'tel' | 'number'
    ariaLabel?: string
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = ({
    value,
    onChange,
    placeholder,
    type = 'text',
    ariaLabel,
    onFocus,
    onBlur,
    onKeyDown,
}: InputProps) => {
    return (
        <input
            type={type}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            aria-label={ariaLabel}
        />
    )
}
