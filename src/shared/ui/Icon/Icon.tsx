import './Icon.scss'

const ICONS: Record<string, string> = {
    search: '🔍',
    cart: '🛒',
    heart: '♡',
    star: '★',
    user: '👤',
    menu: '☰',
    close: '✕',
    check: '✓',
    arrowRight: '→',
}

interface IconProps {
    name: keyof typeof ICONS | string
    className?: string
}

export const Icon = ({ name, className = '' }: IconProps) => {
    return (
        <span className={`icon${className ? ` ${className}` : ''}`} aria-hidden="true">
            {ICONS[name] ?? name}
        </span>
    )
}
