/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  semi: false,
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  importOrder: ['<BUILTIN_MODULES>', '', '<THIRD_PARTY_MODULES>', '', '^@repo/(.*)$', '', '^[.]', '', '.(s?css)$'],
}
