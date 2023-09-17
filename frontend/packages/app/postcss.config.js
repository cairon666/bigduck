const tailwindcss = require('tailwindcss');

const config = {
    plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};

module.exports = config;
