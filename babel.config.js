module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@stores': './src/stores',
          '@assets': './src/assets',
        },
      },
    ],
    ...(process.env.NODE_ENV === 'production'
      ? ['transform-remove-console']
      : []),
  ],
};
