import { withThemeByClassName } from '@storybook/addon-styling';
import '../src/app/styles/index.scss';

export const decorators = [
    withThemeByClassName({
        themes: {
            light: '',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
];
