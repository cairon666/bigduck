import '../src/app/styles/index.scss';

import { withThemeByClassName } from '@storybook/addon-styling';

export const decorators = [
    withThemeByClassName({
        themes: {
            light: '',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
];
