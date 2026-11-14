import './CatalogList.scss'

import type { Product } from '../../../../entities/product'
import { EmptyState } from '../../../../shared/ui/EmptyState'
import { ConnectedProductCard } from '../../../product-card'

interface CatalogListProps {
    products: Product[]
    query: string
}

export const CatalogList = ({ products, query }: CatalogListProps) => {
    if (products.length === 0) {
        return (
            <EmptyState
                icon="🔍"
                title="Товарів не знайдено"
                text={
                    query.trim()
                        ? `За запитом «${query.trim()}» нічого не знайдено. Спробуйте інший пошук або категорію.`
                        : 'Спробуйте змінити фільтри.'
                }
            />
        )
    }

    return (
        <div className="catalog-list">
            {products.map((product) => (
                <ConnectedProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
