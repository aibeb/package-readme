'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readme = require('./readme');

var _readme2 = _interopRequireDefault(_readme);

var _structure = require('./structure');

var _structure2 = _interopRequireDefault(_structure);

var _author = require('./author');

var _author2 = _interopRequireDefault(_author);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readme = new _readme2.default(_package2.default.name, _package2.default.description);
readme.keywords = _package2.default.keywords;
readme.structure = '' + new _structure2.default().recursion(process.cwd()).line;
readme.author = new _author2.default(_package2.default.author).toString();
readme.contributors = _package2.default.contributors;
readme.license = _package2.default.license;

_fs2.default.writeFile(_path2.default.join(process.cwd(), 'README.md'), readme.toString(), function (err) {
  if (err) throw err;
});
process.stdout.write('Write README.md on ' + process.cwd());