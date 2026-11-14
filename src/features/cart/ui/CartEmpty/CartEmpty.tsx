import { EmptyState } from '../../../../shared/ui/EmptyState'

export const CartEmpty = () => {
    return (
        <EmptyState
            icon="🛒"
            title="Ваш кошик порожній"
            text="Схоже, ви ще нічого не додали."
            actionLabel="До каталогу"
            actionTo="/catalog"
        />
    )
}
