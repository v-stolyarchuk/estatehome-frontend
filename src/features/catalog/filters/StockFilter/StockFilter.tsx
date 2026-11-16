import './StockFilter.scss'

interface StockFilterProps {
    checked: boolean
    onChange: () => void
}

export const StockFilter = ({ checked, onChange }: StockFilterProps) => {
    return (
        <label className="stock-filter">
            <input
                type="checkbox"
                className="stock-filter__checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="stock-filter__label">Тільки в наявності</span>
        </label>
    )
}
