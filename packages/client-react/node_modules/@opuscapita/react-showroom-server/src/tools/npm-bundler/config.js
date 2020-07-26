'use strict';

let libPath = require('path');

module.exports = {
  installationRoot: libPath.resolve(__dirname, '../../../tmp/npm-installer/packages'),
  packagesInfoPath: libPath.resolve(__dirname, '../../../tmp/npm-installer/packages-info.js'),
  webpackConfigPath: libPath.resolve(__dirname, './webpack.config.js')
};
