const reactConfig = require('./.config/eslint/react');
const tsConfig = require('./.config/eslint/typescript');
const someConfig = require('./.config/eslint/some');

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
        // the following lines do the trick
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:security/recommended',
        'plugin:@typescript-eslint/recommended',
        // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
        // Make sure it's always the last config, so it gets the chance to override other configs.
        'eslint-config-prettier',
        // 'prettier',
    ],
    settings: {
        'react': {
            // Tells eslint-plugin-react to automatically detect the version of React to use.
            version: 'detect',
        },
        // Tells eslint how to resolve imports
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            },
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        ...tsConfig.rules,
        ...reactConfig.rules,
        ...someConfig.rules,
        'prettier/prettier': 'error',
    },
    ignorePatterns: ['node_modules', 'build', '.config.js'],
};
