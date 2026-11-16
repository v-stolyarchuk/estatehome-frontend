import { HashRouter, Route, Routes } from 'react-router-dom'

import { CartToast } from '../../features/cart/ui/CartToast'
import { Container } from '../../shared/ui/Container'
import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { DocumentTitle } from './DocumentTitle'
import { routes } from './routes'
import { ScrollToTop } from './ScrollToTop'

export function AppRouter() {
    return (
        <HashRouter>
            <ScrollToTop />
            <DocumentTitle />
            <Header />
            <Container>
                <Routes>
                    {routes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Routes>
            </Container>
            <Footer />
            <CartToast />
        </HashRouter>
    )
}
