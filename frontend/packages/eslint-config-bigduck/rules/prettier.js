module.exports = {
    "extends": ["prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: 'all',
                quoteProps: 'consistent',
                jsxSingleQuote: false,
                bracketSpacing: true,
                arrowParens: 'always',
                endOfLine: 'lf',
                tabWidth: 4,
                useTabs: false,
                semi: true,
                printWidth: 120,
                plugins: [
                    '@trivago/prettier-plugin-sort-imports',
                    'prettier-plugin-tailwindcss',  
                ],
                importOrder: [
                    '^@shared/(.*)$',
                    '^@app/(.*)$',
                    '^@entities/(.*)$',
                    '^@features/(.*)$',
                    '^@widgets/(.*)$',
                    '^@pages/(.*)$',
                    '^[./]',
                ],
                overrides: [
                    {
                        files: '*.json',
                        options: {
                            tabWidth: 2,
                        },
                    },
                    {
                        files: '*.{yml,yaml}',
                        options: {
                            tabWidth: 2,
                        },
                    },
                ],
            }
          ],
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off"
    }
}