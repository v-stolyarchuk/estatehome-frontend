import './Layout.scss'

import { useEffect } from 'react'
import { matchPath, Outlet, useLocation } from 'react-router-dom'

import { routes } from './routes'

export function Layout() {
    const { pathname } = useLocation()
    const route = routes.find((r) => matchPath(r.path, pathname))
    const title = route?.title ?? 'Сторінку не знайдено'

    useEffect(() => {
        document.title = `${title} — EstateHome`
    }, [title])

    return (
        <div className="layout">
            <header className="layout__header">
                <h1>{title}</h1>
            </header>
            <main className="layout__main">
                <Outlet />
            </main>
        </div>
    )
}
