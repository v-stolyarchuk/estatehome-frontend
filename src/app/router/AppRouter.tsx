import { HashRouter, Route, Routes } from 'react-router-dom'

import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { routes } from './routes'

export function AppRouter() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
            <Footer />
        </HashRouter>
    )
}
