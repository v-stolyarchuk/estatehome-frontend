import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const APP_INTERNALS = ['App', 'main', 'providers', 'router', 'store'].map(
    (name) => `**/app/${name}`,
)

const LAYER_IMPORT_BANS = {
    shared: ['entities', 'features', 'widgets', 'pages', 'app'],
    entities: ['features', 'widgets', 'pages', 'app'],
    features: ['widgets', 'pages', ...APP_INTERNALS],
    widgets: ['pages', ...APP_INTERNALS],
}

const toImportPatterns = (names) =>
    names.flatMap((name) =>
        name.startsWith('**/') ? [name, `${name}/**`] : [`**/${name}`, `**/${name}/**`],
    )

const boundaryConfigs = Object.entries(LAYER_IMPORT_BANS).map(([layer, banned]) => ({
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: toImportPatterns(banned),
                        message: `The '${layer}' layer must not import from a higher layer.`,
                    },
                ],
            },
        ],
    },
}))

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            react.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
        ],
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
        },
    },
    ...boundaryConfigs,
])
