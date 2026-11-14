import './ReviewsSection.scss'

import { reviewsData } from '../../entities/review'
import { ReviewCard } from './components/ReviewCard'

export const ReviewsSection = () => {
    return (
        <section className="reviews-section">
            <h2 className="reviews-section__title">Що кажуть наші клієнти</h2>
            <div className="reviews-section__grid">
                {reviewsData.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </section>
    )
}
