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

var _sanitizeFilename = require('sanitize-filename');

var _sanitizeFilename2 = _interopRequireDefault(_sanitizeFilename);

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../translations');

var _translations2 = _interopRequireDefault(_translations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label = 'createFolder';

function _handler(apiOptions, actions) {
  var _this = this;

  var getMessage = _translations2.default.bind(null, apiOptions.locale);

  var showDialog = actions.showDialog,
      hideDialog = actions.hideDialog,
      navigateToDir = actions.navigateToDir,
      getResource = actions.getResource;


  var rawDialogElement = {
    elementType: 'SetNameDialog',
    elementProps: {
      onHide: hideDialog,
      onSubmit: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(folderName) {
          var resource, resourceChildren, alreadyExists, result;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  resource = getResource();
                  _context.next = 3;
                  return _api2.default.getChildrenForId(apiOptions, { id: resource.id });

                case 3:
                  resourceChildren = _context.sent;
                  alreadyExists = resourceChildren.some(function (o) {
                    return o.title === folderName;
                  });

                  if (!alreadyExists) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt('return', getMessage('fileExist', { name: folderName }));

                case 9:
                  hideDialog();
                  _context.next = 12;
                  return _api2.default.createFolder(apiOptions, resource.id, folderName);

                case 12:
                  result = _context.sent;

                  navigateToDir(resource.id, result.id, false);

                case 14:
                  return _context.abrupt('return', null);

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function onSubmit(_x) {
          return _ref.apply(this, arguments);
        };
      }(),
      onValidate: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(folderName) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (folderName) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('emptyName'));

                case 4:
                  if (!(folderName === 'CON')) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('doNotRespectBill'));

                case 8:
                  if (!(folderName.length >= 255)) {
                    _context2.next = 12;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('tooLongName'));

                case 12:
                  if (!(folderName.trim() !== (0, _sanitizeFilename2.default)(folderName.trim()))) {
                    _context2.next = 14;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('notAllowedCharacters'));

                case 14:
                  return _context2.abrupt('return', null);

                case 15:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function onValidate(_x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
      headerText: getMessage('folderName'),
      submitButtonText: getMessage('create')
    }
  };

  showDialog(rawDialogElement);
}

exports.default = function (apiOptions, actions) {
  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  return {
    id: label,
    icon: { svg: _iconsSvg2.default.createNewFolder },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      return true;
    },
    availableInContexts: ['files-view', 'new-button'],
    handler: function handler() {
      return _handler(apiOptions, actions);
    }
  };
};