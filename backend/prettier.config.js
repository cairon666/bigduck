module.exports = {
    "singleQuote": true,
    "trailingComma": "all",
    "quoteProps": "consistent",
    "jsxSingleQuote": false,
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "always",
    "endOfLine": "lf",
    "tabWidth": 4,
    "semi": true,
    "overrides": [
        {
            "files": "*.json",
            "options": {
                "tabWidth": 2
            }
        },
        {
            "files": "*.{yml,yaml}",
            "options": {
                "tabWidth": 2
            }
        }
    ]
}