'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gitignore = require('./gitignore');

var _gitignore2 = _interopRequireDefault(_gitignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultignore = ['node_modules', '.git'];
const ignores = defaultignore.concat((0, _gitignore2.default)(process.cwd()));

class Structure {
  constructor() {
    this.title = 'Here is the structure of the app:';
  }

  recursion(dir, _line = [], _prefix = '') {
    const name = _path2.default.basename(dir);
    let prefix = _prefix;
    let line = _line;
    const item = { name };
    if (_fs2.default.statSync(dir).isDirectory()) {
      if (dir === process.cwd()) {
        line.push('.');
      } else {
        prefix += '│   ';
      }
      const files = _fs2.default.readdirSync(dir).filter(file => {
        let match = true;
        ignores.forEach(ignore => {
          if (new RegExp(ignore).exec(file)) {
            match = false;
          }
        });
        return match;
      });
      item.children = files.map((file, index) => {
        if (files.length - 1 === index) {
          line.push(`${prefix}└── ${file}`);
        } else {
          line.push(`${prefix}├── ${file}`);
        }
        return this.recursion(_path2.default.join(dir, file), line, prefix);
      });
    }
    line = line.join('\n');
    return { item, line };
  }
}

exports.default = Structure;