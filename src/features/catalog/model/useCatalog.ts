import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { CATEGORIES, getCategoryLabel } from '../../../entities/category'
import type { Product } from '../../../entities/product'
import { getProductDiscountPercent, selectProducts } from '../../../entities/product'
import type { CatalogSort } from './catalog.types'

const SORT_OPTIONS: Record<Exclude<CatalogSort, 'featured'>, (a: Product, b: Product) => number> = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    discount: (a, b) =>
        (getProductDiscountPercent(b) ?? 0) - (getProductDiscountPercent(a) ?? 0) ||
        a.price - b.price,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.title.localeCompare(b.title),
    'name-desc': (a, b) => b.title.localeCompare(a.title),
}

const SORT_VALUES = Object.keys(SORT_OPTIONS) as CatalogSort[]

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((category) => category.slug))

const parsePrice = (value: string | null): number | null => {
    if (value === null) {
        return null
    }
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export const useCatalog = () => {
    const products = useAppSelector(selectProducts)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get('q') ?? ''
    const sortParam = searchParams.get('sort') as CatalogSort | null
    const sortBy: CatalogSort =
        sortParam && SORT_VALUES.includes(sortParam) ? sortParam : 'featured'
    const selectedCategories = (searchParams.get('category') ?? '')
        .split(',')
        .filter((slug) => CATEGORY_SLUGS.has(slug))
    const minPrice = parsePrice(searchParams.get('min'))
    const maxPrice = parsePrice(searchParams.get('max'))
    const inStockOnly = searchParams.get('stock') === '1'

    const categories = useMemo(() => CATEGORIES.map((category) => category.slug), [])

    const updateParams = (mutate: (params: URLSearchParams) => void) => {
        const next = new URLSearchParams(searchParams)
        mutate(next)
        setSearchParams(next, { replace: true })
    }

    const setQuery = (value: string) =>
        updateParams((params) => {
            if (value) {
                params.set('q', value)
            } else {
                params.delete('q')
            }
        })

    const toggleCategory = (category: string) =>
        updateParams((params) => {
            const next = params.has('category')
                ? params.get('category')!.split(',').filter(Boolean)
                : []
            const updated = next.includes(category)
                ? next.filter((slug) => slug !== category)
                : [...next, category]
            if (updated.length > 0) {
                params.set('category', updated.join(','))
            } else {
                params.delete('category')
            }
        })

    const setSortBy = (sort: CatalogSort) =>
        updateParams((params) => {
            if (sort === 'featured') {
                params.delete('sort')
            } else {
                params.set('sort', sort)
            }
        })

    const setPriceRange = (min: number | null, max: number | null) =>
        updateParams((params) => {
            if (min === null) {
                params.delete('min')
            } else {
                params.set('min', String(min))
            }
            if (max === null) {
                params.delete('max')
            } else {
                params.set('max', String(max))
            }
        })

    const toggleInStockOnly = () =>
        updateParams((params) => {
            if (params.get('stock') === '1') {
                params.delete('stock')
            } else {
                params.set('stock', '1')
            }
        })

    const resetFilters = () => setSearchParams({}, { replace: true })

    const hasActiveFilters =
        query.trim() !== '' ||
        selectedCategories.length > 0 ||
        sortBy !== 'featured' ||
        minPrice !== null ||
        maxPrice !== null ||
        inStockOnly

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
            const matchesPrice =
                (minPrice === null || product.price >= minPrice) &&
                (maxPrice === null || product.price <= maxPrice)
            const matchesStock = !inStockOnly || product.availability === 'in-stock'
            return matchesQuery && matchesCategory && matchesPrice && matchesStock
        })

        if (sortBy === 'featured') {
            return filtered
        }
        return [...filtered].sort(SORT_OPTIONS[sortBy])
    }, [products, query, selectedCategories, sortBy, minPrice, maxPrice, inStockOnly])

    return {
        query,
        setQuery,
        categories,
        selectedCategories,
        toggleCategory,
        resetFilters,
        hasActiveFilters,
        sortBy,
        setSortBy,
        minPrice,
        maxPrice,
        setPriceRange,
        inStockOnly,
        toggleInStockOnly,
        filteredProducts,
    }
}
