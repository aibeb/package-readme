'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Author = function () {
  function Author(_person) {
    _classCallCheck(this, Author);

    if (typeof _person === 'string') {
      var person = _person.split(' ');
      this.name = person[0];
      this.email = person[1];
      this.url = person[2];
    } else {
      this.name = _person.name;
      this.email = _person.email;
      this.url = _person.url;
    }
  }

  _createClass(Author, [{
    key: 'toString',
    value: function toString() {
      return '[' + this.name + ']' + this.url;
    }
  }]);

  return Author;
}();

exports.default = Author;