const UnoCSS = require('@unocss/postcss').default || require('@unocss/postcss');

module.exports = {
  plugins: [
    UnoCSS(),
    require('autoprefixer'),
  ],
}
