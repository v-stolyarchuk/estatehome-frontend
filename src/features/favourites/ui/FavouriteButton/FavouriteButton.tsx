import './FavouriteButton.scss'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import type { Product } from '../../../../entities/product'
import { selectFavouriteIds, toggleFavourite } from '../../model/favouritesSlice'

interface FavouriteButtonProps {
    product: Product
    overlay?: boolean
}

export const FavouriteButton = ({ product, overlay = false }: FavouriteButtonProps) => {
    const dispatch = useAppDispatch()
    const isFavourite = useAppSelector((state) => selectFavouriteIds(state).includes(product.id))

    const classes = [
        'favourite-button',
        isFavourite && 'favourite-button--active',
        overlay && 'favourite-button--overlay',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            type="button"
            className={classes}
            onClick={() => dispatch(toggleFavourite(product.id))}
            aria-label={
                isFavourite
                    ? `Прибрати ${product.title} з обраного`
                    : `Додати ${product.title} в обране`
            }
            aria-pressed={isFavourite}
        >
            {isFavourite ? '♥' : '♡'}
        </button>
    )
}
