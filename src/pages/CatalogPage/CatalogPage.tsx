import './CatalogPage.scss'

import { useSearchParams } from 'react-router-dom'

import { CategoriesFilter } from '../../features/catalog/filters/CategoriesFilter'
import { FilterSearch } from '../../features/catalog/filters/FilterSearch'
import { FilterSortBy } from '../../features/catalog/filters/FilterSortBy'
import { useCatalog } from '../../features/catalog/model/useCatalog'
import { CatalogList } from '../../features/catalog/ui/CatalogList'
import { pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'

export const CatalogPage = () => {
    const [searchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')
    const queryParam = searchParams.get('q')
    const {
        query,
        setQuery,
        categories,
        selectedCategories,
        toggleCategory,
        resetFilters,
        hasActiveFilters,
        sortBy,
        setSortBy,
        filteredProducts,
    } = useCatalog(categoryParam ? [categoryParam] : [], queryParam ?? '')

    return (
        <section className="catalog-page">
            <Breadcrumbs items={[{ label: 'Головна', to: '/' }, { label: 'Каталог' }]} />
            <header className="catalog-page__header">
                <h1 className="catalog-page__title">Каталог</h1>
                <span className="catalog-page__count">
                    {filteredProducts.length}{' '}
                    {pluralize(filteredProducts.length, ['товар', 'товари', 'товарів'])}
                </span>
            </header>

            <div className="catalog-page__controls">
                <FilterSearch value={query} onChange={setQuery} />
                <div className="catalog-page__sort-group">
                    <FilterSortBy value={sortBy} onChange={setSortBy} />
                    {hasActiveFilters && (
                        <button
                            type="button"
                            className="catalog-page__reset"
                            onClick={resetFilters}
                        >
                            Скинути фільтри
                        </button>
                    )}
                </div>
            </div>

            <CategoriesFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggle={toggleCategory}
            />

            <CatalogList products={filteredProducts} query={query} />
        </section>
    )
}
