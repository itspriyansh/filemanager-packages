'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label = 'remove';

function _handler(apiOptions, actions) {
  //
}

exports.default = function (apiOptions, actions) {
  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: 'delete',
    icon: { svg: _iconsSvg2.default.delete },
    label: localeLabel,
    title: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      return false;
    },
    availableInContexts: ['row', 'toolbar'],
    handler: function handler() {
      return _handler(apiOptions, actions);
    }
  };
};