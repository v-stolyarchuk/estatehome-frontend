import { useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { routes } from './routes'

const SITE_NAME = 'EstateHome'

export function DocumentTitle() {
    const { pathname } = useLocation()

    useEffect(() => {
        const route = routes.find((item) => matchPath(item.path, pathname))
        document.title = route ? `${route.title} | ${SITE_NAME}` : SITE_NAME
    }, [pathname])

    return null
}
