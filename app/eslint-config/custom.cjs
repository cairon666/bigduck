/**
 * Причины изменения правил:
 *
 * - @typescript-eslint/explicit-member-accessibility: мы прописываем явно у каждого поля,
 *   метода, геттера или сеттера его модификаторы доступа. Если опускать дефолтный public,
 *   то возникает неконсистентность с конструкторами, в которых модификаторы писать нужно всегда.
 *   "Explicit is better than implicit" (c) Zen of Python.
 */

module.exports = {
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-member-accessibility': ['error'],
            },
        },
    ],
    rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
    },
};
