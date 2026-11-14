import { EmptyState } from '../../../../shared/ui/EmptyState'

export const FavouritesEmpty = () => {
    return (
        <EmptyState
            icon="♡"
            title="Поки що немає обраного"
            text="Натисніть на серце біля товару, щоб зберегти його тут."
            actionLabel="До каталогу"
            actionTo="/catalog"
        />
    )
}
