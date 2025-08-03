const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

// Merge base config
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Wrap with Reanimated config
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
