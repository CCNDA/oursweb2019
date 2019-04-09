module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-preset-env': options['postcss-preset-env']
      ? options['postcss-preset-env']
      : false,
    cssnano: env === 'production' ? options.cssnano : false,
  },
})
