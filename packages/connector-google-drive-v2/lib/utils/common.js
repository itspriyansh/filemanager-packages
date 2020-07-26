"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializePromises = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// execute Promises in series
var serializePromises = exports.serializePromises = function serializePromises(_ref) {
  var series = _ref.series,
      onProgress = _ref.onProgress,
      onFail = _ref.onFail;
  return series.reduce(function (acc, cur, i) {
    return acc.then(function (accValues) {
      onProgress(100 / series.length * i);
      return Promise.all([].concat((0, _toConsumableArray3.default)(accValues), [cur({ onProgress: onProgress, i: i, l: series.length, onFail: onFail })]));
    });
  }, Promise.resolve([]));
};