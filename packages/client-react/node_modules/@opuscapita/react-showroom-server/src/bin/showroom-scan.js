#!/usr/bin/env node

let makeLocalScan = require('../tools/npm-scanner/make-local-scan').default;
let componentsPath = process.argv[2];
makeLocalScan(componentsPath);
