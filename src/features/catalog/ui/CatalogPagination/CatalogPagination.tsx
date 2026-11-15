import './CatalogPagination.scss'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface CatalogPaginationProps {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
}

export const CatalogPagination = ({ page, pageCount, onPageChange }: CatalogPaginationProps) => {
    if (pageCount <= 1) {
        return null
    }

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

    return (
        <nav className="catalog-pagination" aria-label="Пагінація каталогу">
            <button
                type="button"
                className="catalog-pagination__button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Попередня сторінка"
            >
                <FiChevronLeft />
            </button>
            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    className={`catalog-pagination__button${pageNumber === page ? ' catalog-pagination__button--active' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                    aria-current={pageNumber === page ? 'page' : undefined}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                type="button"
                className="catalog-pagination__button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                aria-label="Наступна сторінка"
            >
                <FiChevronRight />
            </button>
        </nav>
    )
}
