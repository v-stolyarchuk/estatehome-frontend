// Copies dist/index.html to dist/404.html so GitHub Pages serves the SPA
// for unknown paths (client-side routing fallback).
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html → dist/404.html')
