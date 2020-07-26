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

var label = 'rename';

function _handler(apiOptions, actions) {
  var _this = this;

  var getMessage = _translations2.default.bind(null, apiOptions.locale);

  var showDialog = actions.showDialog,
      hideDialog = actions.hideDialog,
      navigateToDir = actions.navigateToDir,
      getSelectedResources = actions.getSelectedResources,
      getResource = actions.getResource;


  var rawDialogElement = {
    elementType: 'SetNameDialog',
    elementProps: {
      initialValue: getSelectedResources()[0].title,
      onHide: hideDialog,
      onSubmit: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
          var selectedResources, resourceChildren, alreadyExists, result, resource;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  selectedResources = getSelectedResources();
                  _context.next = 3;
                  return _api2.default.getChildrenForId(apiOptions, { id: selectedResources[0].parents[0].id });

                case 3:
                  resourceChildren = _context.sent;
                  alreadyExists = resourceChildren.some(function (o) {
                    return o.title === name;
                  });

                  if (!alreadyExists) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt('return', getMessage('fileExist', { name: name }));

                case 9:
                  hideDialog();
                  _context.next = 12;
                  return _api2.default.renameResource(apiOptions, selectedResources[0].id, name);

                case 12:
                  result = _context.sent;
                  resource = getResource();

                  navigateToDir(resource.id, result.body.id, false);

                case 15:
                  return _context.abrupt('return', null);

                case 16:
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
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (name) {
                    _context2.next = 4;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('emptyName'));

                case 4:
                  if (!(name.length >= 255)) {
                    _context2.next = 8;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('tooLongName'));

                case 8:
                  if (!(name.trim() !== (0, _sanitizeFilename2.default)(name.trim()))) {
                    _context2.next = 10;
                    break;
                  }

                  return _context2.abrupt('return', getMessage('notAllowedCharacters'));

                case 10:
                  return _context2.abrupt('return', null);

                case 11:
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
      headerText: getMessage('newName'),
      submitButtonText: getMessage(label)
    }
  };

  showDialog(rawDialogElement);
}

exports.default = function (apiOptions, actions) {
  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  var getSelectedResources = actions.getSelectedResources;

  return {
    id: label,
    icon: { svg: _iconsSvg2.default.rename },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable(apiOptions) {
      var selectedResources = getSelectedResources();
      return selectedResources.length === 1 && selectedResources[0].id !== 'root' // root is not mutable
      ;
    },
    availableInContexts: ['row', 'toolbar'],
    handler: function handler() {
      return _handler(apiOptions, actions);
    }
  };
};