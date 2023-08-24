const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
if(config.resolver){
    config.resolver.assetExts.push('cjs');
}

module.exports = config;
