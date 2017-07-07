const path = require('path')
const ExtractCSS = require('extract-text-webpack-plugin')
const sources = (location) => path.join(__dirname, location)

module.exports = {
  entry: {},
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          sources('src'),
          sources('core')
        ],
        query: {
          cacheDirectory: false,
          presets: [],
          plugins: [
            "add-module-exports",
            "transform-es2015-destructuring",
            "transform-object-rest-spread",
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-react-jsx",
            ["fast-async"]
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)(\?.+)?$/,
        loader: 'url-loader?limit=100000',
        include: [
          sources('src/assets'),
          sources('src/client/components')
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        loader: 'file-loader',
        include: [
          sources('src/assets'),
          sources('src/components')
        ]
      },
      {
        test: /\.(css|scss)(\?.+)?$/,
        loader: ExtractCSS.extract([
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]),
        include: [
          sources('src/assets'),
          sources('src/components')
        ]
      }
    ]
  },

  output: {
    filename: 'bundle.js',
    sourcePrefix: ''
  },

  resolve: {
    extensions: [
      ".js",
      ".jsx"
    ],
    alias: {
      'core': path.join(__dirname, 'core')
    }
  },

  plugins: [
    new ExtractCSS({
      filename: 'bundle.css',
      allChunks: true
    })
  ]
};
