import { HashRouter, Route, Routes } from 'react-router-dom'

import { Container } from '../../shared/ui/Container'
import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { routes } from './routes'
import { ScrollToTop } from './ScrollToTop'

export function AppRouter() {
    return (
        <HashRouter>
            <ScrollToTop />
            <Header />
            <Container>
                <Routes>
                    {routes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Routes>
            </Container>
            <Footer />
        </HashRouter>
    )
}
