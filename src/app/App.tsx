import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './router'

function App() {
    return (
        <StoreProvider>
            <AppRouter />
        </StoreProvider>
    )
}

export default App
