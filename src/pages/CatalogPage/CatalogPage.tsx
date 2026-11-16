import './CatalogPage.scss'

import { useAppSelector } from '../../app/hooks'
import { selectProducts } from '../../entities/product'
import { CategoriesFilter } from '../../features/catalog/filters/CategoriesFilter'
import { FilterSearch } from '../../features/catalog/filters/FilterSearch'
import { FilterSortBy } from '../../features/catalog/filters/FilterSortBy'
import { PriceFilter } from '../../features/catalog/filters/PriceFilter'
import { SaleFilter } from '../../features/catalog/filters/SaleFilter'
import { StockFilter } from '../../features/catalog/filters/StockFilter'
import { useCatalog } from '../../features/catalog/model/useCatalog'
import { CatalogList } from '../../features/catalog/ui/CatalogList'
import { pluralize } from '../../shared/lib'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'

export const CatalogPage = () => {
    const allProducts = useAppSelector(selectProducts)
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
        minPrice,
        maxPrice,
        setPriceRange,
        inStockOnly,
        toggleInStockOnly,
        saleOnly,
        toggleSaleOnly,
        filteredProducts,
    } = useCatalog()

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
                <FilterSearch value={query} onChange={setQuery} products={allProducts} />
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

            <div className="catalog-page__options">
                <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={setPriceRange} />
                <StockFilter checked={inStockOnly} onChange={toggleInStockOnly} />
                <SaleFilter checked={saleOnly} onChange={toggleSaleOnly} />
            </div>

            <CatalogList
                key={`${query}|${selectedCategories.join(',')}|${sortBy}|${minPrice}|${maxPrice}|${inStockOnly}|${saleOnly}`}
                products={filteredProducts}
                query={query}
            />
        </section>
    )
}
