import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS(),
    require('postcss-import'),
    require('autoprefixer'),
  ],
}
