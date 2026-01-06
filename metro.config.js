// Metro config for Expo SDK 54 (web + native).
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

// Keep defaults; having an explicit config avoids "missing metro config" issues
// in some setups, and makes future web tweaks straightforward.
module.exports = config;

