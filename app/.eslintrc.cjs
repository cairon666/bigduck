const MainConfig = require('./eslint-config/main.cjs');
const ReactConfig = require('./eslint-config/react.cjs');
const TypescriptConfig = require('./eslint-config/typescript.cjs');
const CustomConfig = require('./eslint-config/custom.cjs');

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['vite-env.d.ts'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [...CustomConfig.overrides],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        ...MainConfig.rules,
        ...ReactConfig.rules,
        ...TypescriptConfig.rules,
        ...CustomConfig.rules,
    },
    root: true,
    settings: {
        react: {
            version: "detect"
        }
    }
};
