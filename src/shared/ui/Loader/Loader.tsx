import './Loader.scss'

interface LoaderProps {
    className?: string
}

export const Loader = ({ className = '' }: LoaderProps) => {
    return (
        <div
            className={`loader${className ? ` ${className}` : ''}`}
            role="status"
            aria-label="Завантаження"
        />
    )
}
