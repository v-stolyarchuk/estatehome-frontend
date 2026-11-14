import './Input.scss'

interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: 'text' | 'search' | 'email' | 'tel'
    ariaLabel?: string
}

export const Input = ({ value, onChange, placeholder, type = 'text', ariaLabel }: InputProps) => {
    return (
        <input
            type={type}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={ariaLabel}
        />
    )
}
