module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    [
      '@csstools/postcss-global-data',
      {
        files: ['./src/styles/custom_media.css'],
      },
    ],
    'postcss-nesting',
    'postcss-custom-media',
  ],
}
