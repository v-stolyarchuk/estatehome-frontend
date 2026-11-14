import './ReviewAuthor.scss'

import { formatDate, getInitials } from '../../../../shared/lib'

interface ReviewAuthorProps {
    name: string
    date: string
}

export const ReviewAuthor = ({ name, date }: ReviewAuthorProps) => {
    return (
        <div className="review-author">
            <span className="review-author__avatar" aria-hidden="true">
                {getInitials(name)}
            </span>
            <div className="review-author__info">
                <span className="review-author__name">{name}</span>
                <span className="review-author__date">{formatDate(date)}</span>
            </div>
        </div>
    )
}
