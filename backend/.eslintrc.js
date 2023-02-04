const tryExtensions = [".js", ".json", ".ts", ".node"]

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:security/recommended",
        "plugin:node/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "2020",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "mocha",

    ],
    "rules": {
        "node/exports-style": ["off"],
        "node/prefer-global/buffer": ["error", "always"],
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "node/prefer-promises/dns": "error",
        "node/prefer-promises/fs": "error",
        "node/no-unsupported-features/es-syntax": ["off"],
        "node/no-missing-import": ["error", {
            "tryExtensions": tryExtensions,
            "resolvePaths": [__dirname],
            "allowModules": []
        }],
        "node/no-unpublished-import": ["error", {
            "allowModules": [
                "cookie-parser"
            ],
            "tryExtensions": tryExtensions
        }],
        "node/file-extension-in-import": ["off"],
        "@typescript-eslint/ban-ts-comment": ["off"],
        "node/no-extraneous-import": ["error", {
            "allowModules": [],
            "resolvePaths": [__dirname],
            "tryExtensions": tryExtensions
        }],
        '@typescript-eslint/no-var-requires': 0,
    },
    ignorePatterns: [
        "node_modules",
        "build"
    ]
}
