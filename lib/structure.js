'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gitignore = require('./gitignore');

var _gitignore2 = _interopRequireDefault(_gitignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultignore = ['node_modules', '.git'];
var ignores = defaultignore.concat((0, _gitignore2.default)(process.cwd()));

var Structure = function () {
  function Structure() {
    _classCallCheck(this, Structure);

    this.title = 'Here is the structure of the app:';
  }

  _createClass(Structure, [{
    key: 'recursion',
    value: function recursion(dir) {
      var _this = this;

      var _line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var name = _path2.default.basename(dir);
      var prefix = _prefix;
      var line = _line;
      var item = { name: name };
      if (_fs2.default.statSync(dir).isDirectory()) {
        if (dir === process.cwd()) {
          line.push('.');
        } else {
          prefix += '│   ';
        }
        var files = _fs2.default.readdirSync(dir).filter(function (file) {
          var match = true;
          ignores.forEach(function (ignore) {
            if (new RegExp(ignore).exec(file)) {
              match = false;
            }
          });
          return match;
        });
        item.children = files.map(function (file, index) {
          if (files.length - 1 === index) {
            line.push(prefix + '\u2514\u2500\u2500 ' + file);
          } else {
            line.push(prefix + '\u251C\u2500\u2500 ' + file);
          }
          return _this.recursion(_path2.default.join(dir, file), line, prefix);
        });
      }
      line = line.join('\n');
      return { item: item, line: line };
    }
  }]);

  return Structure;
}();

exports.default = Structure;