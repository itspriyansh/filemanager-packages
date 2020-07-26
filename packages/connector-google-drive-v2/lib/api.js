'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var appendGoogleApiScript = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!window.gapi) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', false);

          case 2:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = 'https://apis.google.com/js/api.js';
              script.async = true;
              script.defer = true;
              document.body.appendChild(script);
              script.addEventListener('load', function () {
                console.log('Google API Script successfully fetched');
                resolve();
              });
              script.addEventListener('error', function (error) {
                console.log('Can\'t fetch Google API Script', error);
                reject(error);
              });
            }));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function appendGoogleApiScript() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Load the auth2 library.
 *
 * @returns {Promise<any>}
 */


/**
 * Initializes the API client library and sets up sign-in state listeners.
 *
 * @param options
 * @returns {Promise<{}>}
 */
var initClient = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
    var isSignedIn;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return window.gapi.client.init({
              apiKey: options.API_KEY,
              clientId: options.CLIENT_ID,
              discoveryDocs: options.DISCOVERY_DOCS,
              scope: options.SCOPES
            });

          case 2:
            if (window.gapi.auth2.getAuthInstance()) {
              _context2.next = 5;
              break;
            }

            console.log('Can\'t init Google API client');
            return _context2.abrupt('return', {
              apiInitialized: false,
              apiSignedIn: false
            });

          case 5:
            isSignedIn = hasSignedIn();


            if (isSignedIn) {
              console.log('Google Drive sign-in Success');
            } else {
              console.log('Google Drive sign-in fail');
            }

            return _context2.abrupt('return', {
              apiInitialized: true,
              apiSignedIn: isSignedIn
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function initClient(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Init Google API
 *
 * @param options
 * @returns {Promise<{apiInitialized: boolean, apiSignedIn: boolean}>}
 */


var init = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return appendGoogleApiScript();

          case 2:
            _context3.next = 4;
            return loadAuth2Library();

          case 4:
            console.log('Try auth on Google Drive API');
            _context3.next = 7;
            return initClient(options);

          case 7:
            return _context3.abrupt('return', _context3.sent);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function init(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Normalize Resource
 *
 * @param resource
 * @returns {{}} Normalized resource
 */


var getResourceById = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(options, id) {
    var response, resource;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return window.gapi.client.drive.files.get({
              fileId: id
              // fields: 'createdDate,id,modifiedDate,title,mimeType,fileSize,parents,capabilities,downloadUrl'
            });

          case 2:
            response = _context4.sent;
            resource = normalizeResource((0, _extends3.default)({}, response.result));
            return _context4.abrupt('return', resource);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getResourceById(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getParentsForId = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(options, id) {
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var response, parentId, parent;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(id === 'root')) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return', result);

          case 2:
            _context5.next = 4;
            return window.gapi.client.drive.parents.list({
              fileId: id
              // fields: 'items(id)'
            });

          case 4:
            response = _context5.sent;
            parentId = typeof response.result.items[0] === 'undefined' ? 'root' : response.result.items[0].id;

            if (!(parentId === 'root')) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt('return', result);

          case 8:
            _context5.next = 10;
            return getResourceById(options, parentId);

          case 10:
            parent = _context5.sent;
            _context5.next = 13;
            return getParentsForId(options, parentId, [parent].concat(result));

          case 13:
            return _context5.abrupt('return', _context5.sent);

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getParentsForId(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var getParentIdForResource = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(options, resource) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (resource.parents.length) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', 'root');

          case 2:
            return _context6.abrupt('return', resource.parents[0].id);

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getParentIdForResource(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

var getChildrenForId = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(options, _ref8) {
    var id = _ref8.id,
        _ref8$sortBy = _ref8.sortBy,
        sortBy = _ref8$sortBy === undefined ? 'title' : _ref8$sortBy,
        _ref8$sortDirection = _ref8.sortDirection,
        sortDirection = _ref8$sortDirection === undefined ? 'ASC' : _ref8$sortDirection;
    var response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return window.gapi.client.drive.files.list({
              q: '\'' + id + '\' in parents and trashed = false',
              orderBy: 'folder,' + sortBy + ' ' + (sortDirection === 'ASC' ? '' : 'desc')
              // fields: 'items(createdDate,id,modifiedDate,title,mimeType,fileSize,parents,capabilities,downloadUrl)'
            });

          case 2:
            response = _context7.sent;
            return _context7.abrupt('return', response.result.items.map(function (o) {
              return normalizeResource((0, _extends3.default)({}, o));
            }));

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getChildrenForId(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

var getCapabilitiesForResource = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(options, resource) {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', resource.capabilities || []);

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getCapabilitiesForResource(_x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}();

var downloadResource = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_ref11) {
    var resource = _ref11.resource,
        params = _ref11.params,
        onProgress = _ref11.onProgress,
        _ref11$i = _ref11.i,
        i = _ref11$i === undefined ? 0 : _ref11$i,
        _ref11$l = _ref11.l,
        l = _ref11$l === undefined ? 1 : _ref11$l;
    var accessToken, downloadUrl, direct, mimeType, fileName, res;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
            downloadUrl = params.downloadUrl, direct = params.direct, mimeType = params.mimeType, fileName = params.fileName;

            if (!direct) {
              _context9.next = 4;
              break;
            }

            return _context9.abrupt('return', {
              downloadUrl: downloadUrl,
              direct: direct,
              mimeType: mimeType
            });

          case 4:
            res = void 0;
            _context9.prev = 5;
            _context9.next = 8;
            return _superagent2.default.get(downloadUrl).set('Authorization', 'Bearer ' + accessToken).responseType('blob').on('progress', function (event) {
              onProgress((i * 100 + event.percent) / l);
            });

          case 8:
            res = _context9.sent;
            _context9.next = 14;
            break;

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9['catch'](5);
            throw new Error('Failed to download resource: ' + _context9.t0);

          case 14:
            return _context9.abrupt('return', {
              direct: direct,
              file: res.body,
              fileName: fileName
            });

          case 15:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[5, 11]]);
  }));

  return function downloadResource(_x14) {
    return _ref10.apply(this, arguments);
  };
}();

var downloadResources = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(_ref13) {
    var resources = _ref13.resources,
        apiOptions = _ref13.apiOptions,
        onProgress = _ref13.onProgress;
    var files, zip, blob;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _common.serializePromises)({
              series: resources.map(function (resource) {
                return function (_ref14) {
                  var onProgress = _ref14.onProgress,
                      i = _ref14.i,
                      l = _ref14.l;
                  return downloadResource({
                    resource: resource,
                    params: (0, _extends3.default)({}, (0, _googleDriveUtils.getDownloadParams)(resource), {
                      direct: false
                    }),
                    onProgress: onProgress, i: i, l: l
                  });
                };
              }),
              onProgress: onProgress
            });

          case 2:
            files = _context10.sent;


            onProgress(100);

            zip = new _jszip2.default();
            // add generated files to a zip bundle

            files.forEach(function (_ref15) {
              var fileName = _ref15.fileName,
                  file = _ref15.file;
              return zip.file(fileName, file);
            });

            _context10.next = 8;
            return zip.generateAsync({ type: 'blob' });

          case 8:
            blob = _context10.sent;
            return _context10.abrupt('return', {
              direct: false,
              file: blob,
              fileName: apiOptions.archiveName || 'archive.zip'
            });

          case 10:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function downloadResources(_x15) {
    return _ref12.apply(this, arguments);
  };
}();

var initResumableUploadSession = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(_ref17) {
    var name = _ref17.name,
        size = _ref17.size,
        parentId = _ref17.parentId;
    var accessToken, uploadUrl, res;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
            uploadUrl = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=resumable';
            _context11.next = 4;
            return _superagent2.default.post(uploadUrl).set('Authorization', 'Bearer ' + accessToken).set('X-Upload-Content-Length', size).send({ title: name, parents: [{ id: parentId }] });

          case 4:
            res = _context11.sent;
            return _context11.abrupt('return', res.headers['location']);

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function initResumableUploadSession(_x16) {
    return _ref16.apply(this, arguments);
  };
}();

var uploadChunk = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(_ref19) {
    var sessionUrl = _ref19.sessionUrl,
        size = _ref19.size,
        startByte = _ref19.startByte,
        content = _ref19.content;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt('return', new Promise(function (resolve, reject) {
              var chunkSize = 256 * 1024 * 2;
              var endByte = startByte + chunkSize < size ? startByte + chunkSize : size;

              _superagent2.default.put(sessionUrl).set('Content-Range', 'bytes ' + startByte + '-' + (endByte - 1) + '/' + size).set('Content-Encoding', 'base64').send(btoa(content.slice(startByte, endByte))).end(function (err, res) {
                // if (err) { } // pass
                resolve(res);
              });
            }));

          case 1:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function uploadChunk(_x17) {
    return _ref18.apply(this, arguments);
  };
}();

var getRootId = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt('return', 'root');

          case 1:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getRootId() {
    return _ref20.apply(this, arguments);
  };
}();

var uploadFileToId = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(parentId, file, onProgress) {
    var size, sessionUrl, startByte, res, range, progress;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            size = file.content.length;
            _context14.next = 3;
            return initResumableUploadSession({ name: file.name, size: size, parentId: parentId });

          case 3:
            sessionUrl = _context14.sent;
            startByte = 0;

          case 5:
            if (!(startByte < size)) {
              _context14.next = 14;
              break;
            }

            _context14.next = 8;
            return uploadChunk({
              sessionUrl: sessionUrl,
              size: size,
              startByte: startByte,
              content: file.content
            });

          case 8:
            res = _context14.sent;


            if (res.status === 308) {
              range = (0, _rangeParser2.default)(size, res.headers['range']);

              startByte = range[0].end + 1;

              progress = startByte / (size / 100);

              onProgress(progress);
            }

            if (!(res.status === 200 || res.status === 201)) {
              _context14.next = 12;
              break;
            }

            return _context14.abrupt('return', res);

          case 12:
            _context14.next = 5;
            break;

          case 14:
            return _context14.abrupt('return', null);

          case 15:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function uploadFileToId(_x18, _x19, _x20) {
    return _ref21.apply(this, arguments);
  };
}();

var createFolder = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(apiOptions, parentId, folderName) {
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return window.gapi.client.drive.files.insert({
              title: folderName,
              parents: [{ id: parentId }],
              mimeType: 'application/vnd.google-apps.folder'
            });

          case 2:
            return _context15.abrupt('return', _context15.sent);

          case 3:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function createFolder(_x21, _x22, _x23) {
    return _ref22.apply(this, arguments);
  };
}();

var renameResource = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(apiOptions, id, newName) {
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return window.gapi.client.drive.files.patch({
              fileId: id,
              title: newName
            });

          case 2:
            return _context16.abrupt('return', _context16.sent);

          case 3:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function renameResource(_x24, _x25, _x26) {
    return _ref23.apply(this, arguments);
  };
}();

var removeResources = function () {
  var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }));

  return function removeResources() {
    return _ref24.apply(this, arguments);
  };
}();

var signIn = function () {
  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            window.gapi.auth2.getAuthInstance().signIn();

          case 1:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function signIn() {
    return _ref25.apply(this, arguments);
  };
}();

var signOut = function () {
  var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            window.gapi.auth2.getAuthInstance().signOut();

          case 1:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function signOut() {
    return _ref26.apply(this, arguments);
  };
}();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _common = require('./utils/common');

var _googleDriveUtils = require('./google-drive-utils');

var _rangeParser = require('range-parser');

var _rangeParser2 = _interopRequireDefault(_rangeParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadAuth2Library() {
  return new Promise(function (resolve) {
    window.gapi.load('client:auth2', function () {
      return resolve();
    });
  });
}

/**
 * hasSignedIn
 *
 * @returns {boolean}
 */
function hasSignedIn() {
  return window.gapi.auth2.getAuthInstance().isSignedIn.get();
}function normalizeResource(resource) {
  return {
    createdDate: Date.parse(resource.createdDate),
    id: resource.id,
    modifiedDate: Date.parse(resource.modifiedDate),
    title: resource.title,
    type: resource.mimeType === 'application/vnd.google-apps.folder' ? 'dir' : 'file',
    size: typeof resource.fileSize === 'undefined' ? resource.fileSize : parseInt(resource.fileSize, 10),
    parents: resource.parents,
    capabilities: resource.capabilities,
    downloadUrl: resource.downloadUrl,
    mimeType: resource.mimeType,
    exportLinks: resource.exportLinks
  };
}

function getResourceName(apiOptions, resource) {
  return resource.title;
}

exports.default = {
  init: init,
  hasSignedIn: hasSignedIn,
  getResourceById: getResourceById,
  getChildrenForId: getChildrenForId,
  getRootId: getRootId,
  getParentsForId: getParentsForId,
  getParentIdForResource: getParentIdForResource,
  getCapabilitiesForResource: getCapabilitiesForResource,
  getResourceName: getResourceName,
  createFolder: createFolder,
  downloadResource: downloadResource,
  downloadResources: downloadResources,
  uploadFileToId: uploadFileToId,
  renameResource: renameResource,
  removeResources: removeResources,
  signIn: signIn,
  signOut: signOut
};