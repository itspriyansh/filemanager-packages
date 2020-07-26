'use strict';

let libPath = require('path');
let semver = require('semver');

module.exports = {
  packages: [
    {
      name: 'jcatalog-react-reference-search',
      versionsFilter: version => semver.gt(version, '2.2.8') && !/snapshot/gi.test(version)
    }
  ],
  installationRoot: libPath.resolve(libPath.join(__dirname, '../../../tmp/npm-installer/packages')),
  packagesInfoPath: libPath.resolve(libPath.join(__dirname, '../../../tmp/npm-installer/packages-info.js'))
};
