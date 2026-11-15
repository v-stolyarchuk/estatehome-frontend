import '../shared/styles/main.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { initTheme } from '../shared/lib'
import App from './App.tsx'

initTheme()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
