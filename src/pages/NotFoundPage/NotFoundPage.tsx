import './NotFoundPage.scss'

import { Link } from 'react-router-dom'

export function NotFoundPage() {
    return (
        <section className="page page--not-found">
            <h2>404 — Сторінку не знайдено</h2>
            <Link to="/">На головну</Link>
        </section>
    )
}
