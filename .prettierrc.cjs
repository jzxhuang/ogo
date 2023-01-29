/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  semi: false,
  // import order config: https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports
  // importOrder: ["^@spatialsys/(.*)$", "^src/(.*)$", "^[./](?!.*[.]s?css$).*$", ".*[.](s?css)$"],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]', '.*[.](s?css)$'],
  importOrderSeparation: true, // adds new line between each import declaration group
  importOrderSortSpecifiers: true, // sorts each specifier within a single import`
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  tailwindConfig: './apps/webapp/tailwind.config.js',
}
