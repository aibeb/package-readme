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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (_fs2.default.existsSync(_path2.default.join(process.cwd(), 'package.json'))) {
  const start = (() => {
    var _ref = _asyncToGenerator(function* () {
      const packageJSON = JSON.parse(_fs2.default.readFileSync(_path2.default.join(process.cwd(), 'package.json')));
      const readme = new _readme2.default(packageJSON.name, packageJSON.description, packageJSON.repository ? packageJSON.repository.url : packageJSON.homepage);
      readme.keywords = packageJSON.keywords;
      readme.structure = `${new _structure2.default().recursion(process.cwd()).line}`;
      const author = packageJSON.author.split(' ');
      readme.author = {
        name: author[0],
        email: author[1],
        url: author[2]
      };
      readme.contributors = packageJSON.contributors;
      readme.license = packageJSON.license;

      const questions = [{
        type: 'input',
        name: 'namespace',
        message: `Use ${readme.author.name} as namespace, useage: https://github.com/{namespace}/package-readme?`,
        default: readme.author.name,
        when(answers) {
          return answers.overwrite;
        }
      }];
      if (_fs2.default.existsSync(_path2.default.join(process.cwd(), 'README.md'))) {
        questions.push({
          type: 'confirm',
          name: 'overwrite',
          message: 'Overwrite README.md ?',
          default: false
        });
      }
      const answers = yield _inquirer2.default.prompt(questions);
      readme.namespace = answers.namespace;
      if (answers.overwrite) {
        readme.save();
      } else {
        process.stdout.write(`Abandon write README.md on ${process.cwd()}`);
      }
    });

    return function start() {
      return _ref.apply(this, arguments);
    };
  })();

  start();
} else {
  process.stdout.write(`Can't find package.json, Abandon write README.md on ${process.cwd()}`);
}