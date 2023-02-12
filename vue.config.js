const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'quasar',
  ],

  devServer: {
    port: 5500,
    historyApiFallback: true,
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/openframetimes_db/'
    : './',

});
