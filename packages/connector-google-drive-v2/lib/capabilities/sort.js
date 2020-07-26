'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (apiOptions, actions) {
  var getResource = actions.getResource,
      getSortState = actions.getSortState;

  return {
    id: 'sort',
    shouldBeAvailable: function shouldBeAvailable() {
      return true;
    },
    handler: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var sortBy = _ref2.sortBy,
            sortDirection = _ref2.sortDirection;
        var id, resourceChildren;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = getResource().id;
                _context.next = 3;
                return _api2.default.getChildrenForId(apiOptions, { id: id, sortBy: sortBy, sortDirection: sortDirection });

              case 3:
                resourceChildren = _context.sent;
                return _context.abrupt('return', resourceChildren);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function handler(_x) {
        return _ref.apply(this, arguments);
      };
    }()
  };
};