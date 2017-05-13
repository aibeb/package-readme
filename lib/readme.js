'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Readme = function () {
  function Readme(name, description) {
    _classCallCheck(this, Readme);

    this.banner = '<img src="http://www.eqfox.com/readme/banner/' + name + '" alt="' + name + '" align="center" />';
    this.name = name;
    this.description = description;
    this.badge = 'badge';
  }

  _createClass(Readme, [{
    key: 'toString',
    value: function toString() {
      var template = this.banner + '\n# ' + this.name + '\n\n' + this.description + '\n' + this.badge + '\n\n## Install\n```\nnpm install ' + this.name + '\n```\n\n## Usage\nTODO\n\n## Features\nReally cool app with the most popular technologies:\n* ' + this.keywords.join('\n* ') + '\n\n## Structure\nHere is the structure of the app:\n```\n' + this.structure + '\n```\n\n## Author\n' + this.author + '\n\n## Contributors\n' + this.contributors + '\n\n## License\n' + this.license + '\n';
      return template;
    }
  }]);

  return Readme;
}();

exports.default = Readme;