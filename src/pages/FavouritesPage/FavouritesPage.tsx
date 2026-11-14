import './FavouritesPage.scss'

import { useAppSelector } from '../../app/hooks'
import { selectFavouriteProducts } from '../../features/favourites/model/favouritesSlice'
import { FavouritesEmpty } from '../../features/favourites/ui/FavouritesEmpty'
import { FavouritesItem } from '../../features/favourites/ui/FavouritesItem'
import { pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'

export function FavouritesPage() {
    const products = useAppSelector(selectFavouriteProducts)

    return (
        <section className="favourites-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Обране' }]} />
            <header className="favourites-page__header">
                <h1 className="favourites-page__title">Обране</h1>
                <span className="favourites-page__count">
                    {products.length} {pluralize(products.length, ['товар', 'товари', 'товарів'])}
                </span>
            </header>

            {products.length === 0 ? (
                <FavouritesEmpty />
            ) : (
                <div className="favourites-page__grid">
                    {products.map((product) => (
                        <FavouritesItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}
