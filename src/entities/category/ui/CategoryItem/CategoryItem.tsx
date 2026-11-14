import './CategoryItem.scss'

interface CategoryItemProps {
    name: string
    productCount: number
    onClick?: () => void
}

export const CategoryItem = ({ name, productCount, onClick }: CategoryItemProps) => {
    return (
        <button type="button" className="category-item" onClick={onClick}>
            <span className="category-item__name">{name}</span>
            <span className="category-item__count">
                {productCount} {productCount === 1 ? 'product' : 'products'}
            </span>
        </button>
    )
}
