/** @type {import("prettier").Config} */
const config = {
  // No semicolons — cleaner diffs, personal preference.
  semi: false,
  // Single quotes for strings.
  singleQuote: true,
  // Trailing commas in multi-line structures — cleaner git diffs.
  trailingComma: 'all',
  // 100 chars gives more room than 80 without becoming hard to read.
  printWidth: 100,
  tabWidth: 2,
}

export default config
