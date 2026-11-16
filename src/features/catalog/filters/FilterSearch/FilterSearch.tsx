import './FilterSearch.scss'

import type { KeyboardEvent } from 'react'
import { useMemo, useState } from 'react'

import type { Product } from '../../../../entities/product'
import { getProductImageUrl } from '../../../../entities/product'
import { formatPrice } from '../../../../shared/lib'
import { Input } from '../../../../shared/ui/Input'

const SUGGESTIONS_LIMIT = 6

interface FilterSearchProps {
    value: string
    onChange: (value: string) => void
    products: Product[]
}

export const FilterSearch = ({ value, onChange, products }: FilterSearchProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const suggestions = useMemo(() => {
        const query = value.trim().toLowerCase()
        if (!query) {
            return []
        }
        return products
            .filter((product) => product.title.toLowerCase().includes(query))
            .slice(0, SUGGESTIONS_LIMIT)
    }, [products, value])

    const showSuggestions = isOpen && suggestions.length > 0
    const safeActiveIndex = activeIndex < suggestions.length ? activeIndex : -1

    const handleChange = (next: string) => {
        onChange(next)
        setActiveIndex(-1)
    }

    const selectSuggestion = (product: Product) => {
        onChange(product.title)
        setIsOpen(false)
        setActiveIndex(-1)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) {
            return
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveIndex((prev) => (prev + 1) % suggestions.length)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1))
        } else if (event.key === 'Enter' && safeActiveIndex >= 0) {
            event.preventDefault()
            selectSuggestion(suggestions[safeActiveIndex])
        } else if (event.key === 'Escape') {
            setIsOpen(false)
        }
    }

    return (
        <div className="filter-search">
            <span className="filter-search__icon" aria-hidden="true">
                🔍
            </span>
            <Input
                type="search"
                placeholder="Пошук товарів..."
                value={value}
                onChange={handleChange}
                ariaLabel="Пошук товарів"
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onKeyDown={handleKeyDown}
            />
            {showSuggestions && (
                <ul className="filter-search__suggestions" role="listbox">
                    {suggestions.map((product, index) => (
                        <li key={product.id} role="presentation">
                            <button
                                type="button"
                                role="option"
                                aria-selected={index === safeActiveIndex}
                                className={`filter-search__suggestion${index === safeActiveIndex ? ' filter-search__suggestion--active' : ''}`}
                                onMouseDown={(event) => {
                                    event.preventDefault()
                                    selectSuggestion(product)
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                {product.images.length > 0 && (
                                    <img
                                        src={getProductImageUrl(product)}
                                        alt=""
                                        className="filter-search__suggestion-image"
                                    />
                                )}
                                <span className="filter-search__suggestion-title">
                                    {product.title}
                                </span>
                                <span className="filter-search__suggestion-price">
                                    {formatPrice(product.price)}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
