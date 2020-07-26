'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _handler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(apiOptions, actions) {
    var updateNotifications, getSelectedResources, getNotifications, getMessage, notificationId, notificationChildId, onStart, onSuccess, onFail, onProgress, result, resources, quantity, resource, params, archiveName, _result, direct, downloadUrl, file, fileName, mimeType;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updateNotifications = actions.updateNotifications, getSelectedResources = actions.getSelectedResources, getNotifications = actions.getNotifications;
            getMessage = _translations2.default.bind(null, apiOptions.locale);
            notificationId = label;
            notificationChildId = (0, _nanoid2.default)();

            onStart = function onStart(_ref2) {
              var name = _ref2.name,
                  quantity = _ref2.quantity;

              var notifications = getNotifications();
              var notification = _notifications2.default.getNotification(notifications, notificationId);

              var childElement = {
                elementType: 'NotificationProgressItem',
                elementProps: {
                  title: name,
                  progress: 0,
                  icon: (0, _icons.getIcon)({ title: name })
                }
              };

              var newChildren = _notifications2.default.addChild(notification && notification.children || [], notificationChildId, childElement);
              var newNotification = {
                title: quantity > 1 ? getMessage('downloadingItems', { quantity: quantity }) : getMessage('downloadingItem'),
                children: newChildren
              };

              var newNotifications = notification ? _notifications2.default.updateNotification(notifications, notificationId, newNotification) : _notifications2.default.addNotification(notifications, notificationId, newNotification);

              updateNotifications(newNotifications);
            };

            onSuccess = function onSuccess(_) {
              var notifications = getNotifications();
              var notification = _notifications2.default.getNotification(notifications, notificationId);
              var notificationChildrenCount = notification.children.length;
              var newNotifications = void 0;

              if (notificationChildrenCount > 1) {
                newNotifications = _notifications2.default.updateNotification(notifications, notificationId, {
                  children: _notifications2.default.removeChild(notification.children, notificationChildId)
                });
              } else {
                newNotifications = _notifications2.default.removeNotification(notifications, notificationId);
              }
              updateNotifications(newNotifications);
            };

            onFail = function onFail(err) {
              return console.log(err);
            };

            onProgress = function onProgress(progress) {
              var notifications = getNotifications();
              var notification = _notifications2.default.getNotification(notifications, notificationId);
              var child = _notifications2.default.getChild(notification.children, notificationChildId);
              var newChild = (0, _extends3.default)({}, child, {
                element: (0, _extends3.default)({}, child.element, {
                  elementProps: (0, _extends3.default)({}, child.element.elementProps, {
                    progress: progress
                  })
                })
              });
              var newChildren = _notifications2.default.updateChild(notification.children, notificationChildId, newChild);
              var newNotifications = _notifications2.default.updateNotification(notifications, notificationId, { children: newChildren });
              updateNotifications(newNotifications);
            };

            _context.prev = 8;
            result = void 0;
            resources = getSelectedResources();
            quantity = resources.length;

            if (!(quantity === 1)) {
              _context.next = 21;
              break;
            }

            resource = resources[0];
            params = (0, _googleDriveUtils.getDownloadParams)(resource);

            onStart({ name: getMessage('downloadingName', { name: params.fileName }), quantity: quantity });
            _context.next = 18;
            return _api2.default.downloadResource({ resource: resource, params: params, onProgress: onProgress });

          case 18:
            result = _context.sent;
            _context.next = 26;
            break;

          case 21:
            archiveName = apiOptions.archiveName || 'archive.zip';

            onStart({ name: getMessage('creatingName', { name: archiveName }), quantity: quantity });
            _context.next = 25;
            return _api2.default.downloadResources({ resources: resources, apiOptions: apiOptions, onProgress: onProgress });

          case 25:
            result = _context.sent;

          case 26:
            _result = result, direct = _result.direct, downloadUrl = _result.downloadUrl, file = _result.file, fileName = _result.fileName, mimeType = _result.mimeType;


            if (direct) {
              (0, _download.triggerHiddenForm)((0, _extends3.default)({
                downloadUrl: downloadUrl
              }, mimeType === 'application/pdf' ? { target: '_blank' } : null));
            } else {
              (0, _download.promptToSaveBlob)({ content: file, name: fileName });
            }

            onSuccess();
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context['catch'](8);

            onFail(_context.t0);

          case 34:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 31]]);
  }));

  return function _handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _download = require('../utils/download');

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _notifications = require('../utils/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

var _icons = require('../icons');

var _iconsSvg = require('../icons-svg');

var _iconsSvg2 = _interopRequireDefault(_iconsSvg);

var _translations = require('../translations');

var _translations2 = _interopRequireDefault(_translations);

var _googleDriveUtils = require('../google-drive-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label = 'download';

exports.default = function (apiOptions, actions) {
  var localeLabel = (0, _translations2.default)(apiOptions.locale, label);
  var getSelectedResources = actions.getSelectedResources;

  return {
    id: label,
    icon: { svg: _iconsSvg2.default.fileDownload },
    label: localeLabel,
    shouldBeAvailable: function shouldBeAvailable() {
      var selectedResources = getSelectedResources();
      return selectedResources.length > 0 && selectedResources[0].type !== 'dir';
    },
    handler: function handler() {
      return _handler(apiOptions, actions);
    },
    availableInContexts: ['row', 'toolbar']
  };
};