import { useSyncExternalStore } from 'react'

import { THEME_STORAGE_KEY } from '../config/constants'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = THEME_STORAGE_KEY
const listeners = new Set<() => void>()

const getStoredTheme = (): Theme | null => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
}

const resolveTheme = (): Theme => {
    return (
        getStoredTheme() ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )
}

const applyTheme = (theme: Theme) => {
    if (theme === 'dark') {
        document.documentElement.dataset.theme = 'dark'
    } else {
        delete document.documentElement.dataset.theme
    }
}

export const initTheme = () => {
    applyTheme(resolveTheme())
}

const setTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
    listeners.forEach((listener) => listener())
}

export const toggleTheme = () => {
    setTheme(getThemeSnapshot() === 'dark' ? 'light' : 'dark')
}

const subscribeTheme = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

const getThemeSnapshot = (): Theme => {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export const useTheme = (): Theme => {
    return useSyncExternalStore(subscribeTheme, getThemeSnapshot)
}
