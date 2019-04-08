const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  workboxPlugin = require('workbox-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/app/app.tsx',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '/dist'),
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
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
    },
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap'],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "file" loader makes sure assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['**/*.{html,js,css,png,ttf,eot,woff,woff2,svg}'],
      maximumFileSizeToCacheInBytes: 10000000, //10MB
      navigateFallback: '/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([{ from: './src/web.config', to: './web.config' }]),
  ],
}
