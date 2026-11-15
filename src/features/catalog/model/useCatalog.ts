import { useMemo, useState } from 'react'

import { useAppSelector } from '../../../app/hooks'
import { CATEGORIES, getCategoryLabel } from '../../../entities/category'
import type { Product } from '../../../entities/product'
import { selectProducts } from '../../../entities/product'
import type { CatalogSort } from './catalog.types'

const SORT_OPTIONS: Record<Exclude<CatalogSort, 'featured'>, (a: Product, b: Product) => number> = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.title.localeCompare(b.title),
    'name-desc': (a, b) => b.title.localeCompare(a.title),
}

export const useCatalog = (initialCategories: string[] = [], initialQuery = '') => {
    const products = useAppSelector(selectProducts)
    const [query, setQuery] = useState(initialQuery)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)
    const [sortBy, setSortBy] = useState<CatalogSort>('featured')

    const categories = useMemo(() => CATEGORIES.map((category) => category.slug), [])

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category],
        )
    }

    const selectCategory = (category: string | null) => {
        setSelectedCategories(category ? [category] : [])
    }

    const resetFilters = () => {
        setQuery('')
        setSelectedCategories([])
        setSortBy('featured')
    }

    const hasActiveFilters =
        query.trim() !== '' || selectedCategories.length > 0 || sortBy !== 'featured'

    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        const filtered = products.filter((product) => {
            const matchesQuery = normalizedQuery
                ? [
                      product.title,
                      product.description,
                      product.category,
                      getCategoryLabel(product.category),
                  ]
                      .join(' ')
                      .toLowerCase()
                      .includes(normalizedQuery)
                : true
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(product.category)
            return matchesQuery && matchesCategory
        })

        if (sortBy === 'featured') {
            return filtered
        }
        return [...filtered].sort(SORT_OPTIONS[sortBy])
    }, [products, query, selectedCategories, sortBy])

    return {
        query,
        setQuery,
        categories,
        selectedCategories,
        toggleCategory,
        selectCategory,
        resetFilters,
        hasActiveFilters,
        sortBy,
        setSortBy,
        filteredProducts,
    }
}
