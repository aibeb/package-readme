import fs from 'fs';
import path from 'path';

class Readme {
  constructor(name, description) {
    this.banner = `<img src="http://www.eqfox.com/readme/banner/${name}" alt="${name}" align="center" />`;
    this.name = name;
    this.description = description;
    this.badge = 'badge';
  }

  save() {
    fs.writeFile(path.join(process.cwd(), 'README.md'), this.toString(), (err) => {
      if (err) throw err;
    });

    process.stdout.write(`Write README.md on ${process.cwd()}`);
  }

  toString() {
    const template =
`${this.banner}

# ${this.name}

${this.description}

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/${this.name}.svg?style=flat-square
[npm-url]: https://npmjs.org/package/${this.name}
[travis-image]: https://img.shields.io/travis/eqfox/http-body-parser.svg?style=flat-square
[travis-url]: https://travis-ci.org/eqfox/http-body-parser
[coveralls-image]: https://img.shields.io/coveralls/eqfox/http-body-parser.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/eqfox/http-body-parser?branch=master
[david-image]: https://img.shields.io/david/eqfox/http-body-parser.svg?style=flat-square
[david-url]: https://david-dm.org/eqfox/http-body-parser
[node-image]: https://img.shields.io/badge/node.js-%3E=_7.6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat-square
[gittip-url]: https://www.gittip.com/dead-horse/

## Install
[![NPM](https://nodei.co/npm/${this.name}.png?downloads=true)](https://nodei.co/npm/${this.name}/)
\`\`\`
npm install ${this.name}
\`\`\`

## Usage
TODO

## Features
Really cool app with the most popular technologies:
* ${this.keywords.join('\n* ')}

## Structure
Here is the structure of the app:
\`\`\`
${this.structure}
\`\`\`

## Author
${this.author}

## Contributors
${this.contributors}

## License
${this.license}
`;
    return template;
  }
}

export default Readme;
