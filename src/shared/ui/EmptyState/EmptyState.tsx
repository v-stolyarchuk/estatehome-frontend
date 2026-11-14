import './EmptyState.scss'

import { Button } from '../Button'

interface EmptyStateProps {
    icon: string
    title: string
    text?: string
    actionLabel?: string
    actionTo?: string
}

export const EmptyState = ({ icon, title, text, actionLabel, actionTo }: EmptyStateProps) => {
    return (
        <div className="empty-state">
            <span className="empty-state__icon">{icon}</span>
            <h2 className="empty-state__title">{title}</h2>
            {text && <p className="empty-state__text">{text}</p>}
            {actionLabel && actionTo && (
                <Button to={actionTo} className="empty-state__action">
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}
