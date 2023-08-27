// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    // Required
    framework: '@storybook/react-vite',
    stories: [
        {
            directory: '../src/shared/UIKit/**',
            files: '*.stories.@(js|jsx|ts|tsx)',
            titlePrefix: 'UIKit',
        },
    ],

    // Optional
    addons: [
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-styling',
            options: {
            },
        },
    ],
    docs: {
        autodocs: 'tag',
    },
    core: {
        builder: '@storybook/builder-vite', // 👈 The builder enabled here.
    },
    // staticDirs: ['../public'],
};

export default config;
