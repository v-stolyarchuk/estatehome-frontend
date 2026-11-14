import './ReviewCard.scss'

import type { Review } from '../../../../entities/review'
import { ReviewAuthor } from '../ReviewAuthor'
import { ReviewRating } from '../ReviewRating'

interface ReviewCardProps {
    review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <article className="review-card">
            <ReviewRating rating={review.rating} />
            <p className="review-card__text">{review.text}</p>
            <ReviewAuthor name={review.author} date={review.date} />
        </article>
    )
}
