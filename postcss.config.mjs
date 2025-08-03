import UnoCSS from '@unocss/postcss'

export default {
  plugins: [
    UnoCSS({
      configFile: './uno.config.ts'
    }),
    require('postcss-import'),
    require('autoprefixer'),
  ],
}
