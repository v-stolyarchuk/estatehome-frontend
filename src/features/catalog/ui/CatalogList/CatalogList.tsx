import './CatalogList.scss'

import { useRef, useState } from 'react'

import type { Product } from '../../../../entities/product'
import { EmptyState } from '../../../../shared/ui/EmptyState'
import { ConnectedProductCard } from '../../../product-card'
import { CatalogPagination } from '../CatalogPagination'

const PAGE_SIZE = 9

interface CatalogListProps {
    products: Product[]
    query: string
}

export const CatalogList = ({ products, query }: CatalogListProps) => {
    const [page, setPage] = useState(1)
    const listRef = useRef<HTMLDivElement>(null)

    const pageCount = Math.ceil(products.length / PAGE_SIZE)
    const safePage = Math.min(page, pageCount)
    const pageItems = products.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage)
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

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
        <div className="catalog-list" ref={listRef}>
            <div className="catalog-list__grid">
                {pageItems.map((product) => (
                    <ConnectedProductCard key={product.id} product={product} />
                ))}
            </div>
            <CatalogPagination
                page={safePage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
