const path = require('path'),
  glob = require('glob'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  workboxPlugin = require('workbox-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin'),
  Critters = require('critters-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

const PATHS = {
  src: path.join(__dirname, 'src'),
}

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: 'source-map',
  entry: './src/app/app.tsx',
  output: {
    chunkFilename: '[name].[hash:4].js',
    filename: '[name].[hash:4].js',
    path: path.join(__dirname, '/dist'),
  },

  optimization: devMode
    ? {}
    : {
        minimizer: [new TerserPlugin()],
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]

                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        },
      },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],

    alias: {
      '@app': path.resolve('./src/app/'),
      '@assets': path.resolve('./src/assets/'),
      '@pages': path.resolve('./src/pages/'),
      '@services': path.resolve('./src/services/'),
      '@tests': path.resolve('./src/'),
      '@components': path.resolve('./src/components/'),
      '@theme': path.resolve('./src/theme/'),
      '@data': path.resolve('./src/data/'),
      'react-dom': devMode ? '@hot-loader/react-dom' : 'react-dom',
    },
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: devMode
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
      ]
    : [
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
          filename: devMode ? '[name].css' : '[name].[contenthash:4].css',
          chunkFilename: devMode ? '[id].css' : '[id].[contenthash:4].css',
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: 'defer',
        }),
        new Critters({
          preload: 'swap',
          preloadFonts: true,
          pruneSource: false,
        }),
        new CopyPlugin([
          { from: './src/web.config', to: './web.config' },
          {
            from: './src/manifest.json',
            to: './manifest.json',
          },
        ]),
        new workboxPlugin.GenerateSW({
          swDest: 'sw.js',
          clientsClaim: true,
          skipWaiting: true,
          exclude: ['web.config', '*.json'],
          navigateFallback: '/index.html',
        }),
      ],
}
