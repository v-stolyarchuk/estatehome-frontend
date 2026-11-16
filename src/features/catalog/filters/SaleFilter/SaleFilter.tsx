import './SaleFilter.scss'

interface SaleFilterProps {
    checked: boolean
    onChange: () => void
}

export const SaleFilter = ({ checked, onChange }: SaleFilterProps) => {
    return (
        <label className="sale-filter">
            <input
                type="checkbox"
                className="sale-filter__checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="sale-filter__label">Тільки зі знижкою</span>
        </label>
    )
}
