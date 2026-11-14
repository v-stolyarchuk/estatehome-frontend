import './ReviewRating.scss'

interface ReviewRatingProps {
    rating: number
    max?: number
}

export const ReviewRating = ({ rating, max = 5 }: ReviewRatingProps) => {
    return (
        <span className="review-rating" role="img" aria-label={`Оцінка ${rating} з ${max}`}>
            {Array.from({ length: max }, (_, index) => (
                <span
                    key={index}
                    className={`review-rating__star${index < rating ? ' review-rating__star--filled' : ''}`}
                >
                    ★
                </span>
            ))}
        </span>
    )
}
