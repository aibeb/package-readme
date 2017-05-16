import fs from 'fs';
import path from 'path';

class Readme {
  constructor(name, description, homepage) {
    this.name = name;
    this.description = description;
    this.homepage = homepage;
  }

  save() {
    fs.writeFile(path.join(process.cwd(), 'README.md'), this.toString(), (err) => {
      if (err) throw err;
    });

    process.stdout.write(`Write README.md on ${process.cwd()}`);
  }

  toString() {
    const template =
`<p align="center"><a href="${this.homepage}" target="_blank"><img src="http://47.93.19.167:5000/readme/logo?name=${this.name}"></a></p>

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
[travis-image]: https://img.shields.io/travis/${this.homepage}/${this.name}.svg?style=flat-square
[travis-url]: https://travis-ci.org/${this.namespace}/${this.name}
[coveralls-image]: https://img.shields.io/coveralls/${this.namespace}/${this.name}.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/${this.namespace}/${this.name}?branch=master
[david-image]: https://img.shields.io/david/${this.namespace}/${this.name}.svg?style=flat-square
[david-url]: https://david-dm.org/${this.namespace}/${this.name}
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
[${this.author.name}]${this.author.url}

## Contributors
${this.contributors}

## License
${this.license}
`;
    return template;
  }
}

export default Readme;
