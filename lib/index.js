#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _readme = require('./readme');

var _readme2 = _interopRequireDefault(_readme);

var _structure = require('./structure');

var _structure2 = _interopRequireDefault(_structure);

var _author = require('./author');

var _author2 = _interopRequireDefault(_author);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const readme = new _readme2.default(_package2.default.name, _package2.default.description, _package2.default.repository ? _package2.default.repository.url : _package2.default.homepage);
readme.keywords = _package2.default.keywords;
readme.structure = `${new _structure2.default().recursion(process.cwd()).line}`;
readme.author = new _author2.default(_package2.default.author);
readme.contributors = _package2.default.contributors;
readme.license = _package2.default.license;

const questions = [{
  type: 'confirm',
  name: 'overwrite',
  message: 'Overwrite README.md ?',
  default: false
}, {
  type: 'input',
  name: 'namespace',
  message: `Use ${readme.author.name} as namespace, useage: https://github.com/{namespace}/package-readme?`,
  default: readme.author.name,
  when(answers) {
    return answers.overwrite;
  }
}];

const start = (() => {
  var _ref = _asyncToGenerator(function* () {
    const oldReadme = _fs2.default.readFileSync(_path2.default.join(process.cwd(), 'README.md'));
    if (oldReadme) {
      const answers = yield _inquirer2.default.prompt(questions);
      readme.namespace = answers.namespace;
      if (answers.overwrite) {
        readme.save();
      } else {
        process.stdout.write(`Abandon write README.md on ${process.cwd()}`);
      }
    } else {
      readme.save();
    }
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();

start();