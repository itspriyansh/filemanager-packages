'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getExportMimeType(mimeType) {
  switch (mimeType) {
    case 'application/vnd.google-apps.document':
      return {
        exportMimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extension: 'docx'
      };
    case 'application/vnd.google-apps.spreadsheet':
      return {
        exportMimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extension: 'xlsx'
      };
    case 'application/vnd.google-apps.presentation':
      return {
        exportMimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        extension: 'pptx'
      };
    default:
      return {
        exportMimeType: 'text/plain',
        extension: ''
      };
  }
}

function checkIsGoogleDocument(mimeType) {
  return mimeType === 'application/vnd.google-apps.document' || mimeType === 'application/vnd.google-apps.spreadsheet' || mimeType === 'application/vnd.google-apps.presentation';
}

function getDownloadParams(resource) {
  var mimeType = resource.mimeType,
      title = resource.title;
  var downloadUrl = resource.downloadUrl;


  if (downloadUrl) {
    return {
      downloadUrl: downloadUrl,
      direct: true,
      mimeType: mimeType,
      fileName: title
    };
  }

  var fileName = '';
  var isGoogleDocument = checkIsGoogleDocument(mimeType);

  if (isGoogleDocument) {
    var _getExportMimeType = getExportMimeType(mimeType),
        exportMimeType = _getExportMimeType.exportMimeType,
        extension = _getExportMimeType.extension;

    downloadUrl = resource.exportLinks[exportMimeType];
    fileName = title + '.' + extension;
  } else {
    downloadUrl = 'https://www.googleapis.com/drive/v2/files/' + resource.id + '?alt=media';
    fileName = title;
  }

  return {
    downloadUrl: downloadUrl,
    direct: false,
    mimeType: mimeType,
    fileName: fileName
  };
}

function showUploadDialog() {}

exports.getExportMimeType = getExportMimeType;
exports.checkIsGoogleDocument = checkIsGoogleDocument;
exports.showUploadDialog = showUploadDialog;
exports.getDownloadParams = getDownloadParams;

/*
Documents
  HTML	text/html
  HTML (zipped)	application/zip
  Plain text	text/plain
  Rich text	application/rtf
  Open Office doc	application/vnd.oasis.opendocument.text
  PDF	application/pdf
  MS Word document	application/vnd.openxmlformats-officedocument.wordprocessingml.document
  EPUB	application/epub+zip
Spreadsheets
  MS Excel	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  Open Office sheet	application/x-vnd.oasis.opendocument.spreadsheet
  PDF	application/pdf
  CSV (first sheet only)	text/csv
  TSV (first sheet only)	text/tab-separated-values
  HTML (zipped)	application/zip
Drawings
  JPEG	image/jpeg
  PNG	image/png
  SVG	image/svg+xml
  PDF	application/pdf
Presentations
  MS PowerPoint	application/vnd.openxmlformats-officedocument.presentationml.presentation
  Open Office presentation	application/vnd.oasis.opendocument.presentation
  PDF	application/pdf
Plain
  text
  text/plain
Apps Scripts
  JSON	application/vnd.google-apps.script+json
*/