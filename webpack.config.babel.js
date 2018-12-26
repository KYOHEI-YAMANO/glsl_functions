"use strict"

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, args) => {
  const IS_DEV = args.mode === "development"

  const OUTPUT = (IS_DEV) ? "dev" : "prod"

  return {
    mode: args.mode,
    entry: [
      'babel-polyfill',
      `${__dirname}/src/js/main.js`,
    ],
    output: {
      path: `${__dirname}/${OUTPUT}`,
      filename: 'js/bundle.js'
    },
    devServer: {
      contentBase: './dev/'
    },
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test:/\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {'modules': false}
                ]
              ],
              plugins: ['transform-class-properties']
            },
          },
        },
        {
          test:/\.scss/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${__dirname}/src/html/index.ejs`
      })
    ]
  }
}
