const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin")
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
})
