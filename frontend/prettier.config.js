const config = {
  singleQuote: true,
  trailingComma: "all",
  quoteProps: "consistent",
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  tabWidth: 4,
  useTabs: false,
  semi: true,
  printWidth: 120,
  plugins: [require("prettier-plugin-tailwindcss")],
  // tailwindConfig: path.join(process.cwd(), "tailwind.config.*"),
  overrides: [
    {
      files: "*.json",
      options: {
        tabWidth: 2,
      },
    },
    {
      files: "*.{yml,yaml}",
      options: {
        tabWidth: 2,
      },
    },
  ],
};

module.exports = config;
