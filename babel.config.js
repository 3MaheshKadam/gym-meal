module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

     plugins: [
      'react-native-reanimated/plugin',
      'react-native-worklets/plugin', // ✅ ensure this is here
    ],
  };
};
