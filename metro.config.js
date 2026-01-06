// Metro config for Expo SDK 54 (web + native).
const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("metro-resolver");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

/**
 * Web-only shim for a common Metro error:
 * Unable to resolve "../Utilities/Platform" from
 * "node_modules/react-native/Libraries/ReactPrivate/ReactNativePrivateInterface.js"
 *
 * If your web bundle ever ends up pulling `react-native` internals, this
 * remaps that specific import to a web-safe implementation.
 */
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "../Utilities/Platform") {
    return resolve(context, "react-native-web/dist/exports/Platform", platform);
  }
  return resolve(context, moduleName, platform);
};

module.exports = config;

