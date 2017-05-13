class Readme {
  constructor(name, description) {
    this.banner = `<img src="http://www.eqfox.com/readme/banner/${name}" alt="${name}" align="center" />`;
    this.name = name;
    this.description = description;
    this.badge = 'badge';
  }

  toString() {
    const template =
`${this.banner}
# ${this.name}

${this.description}
${this.badge}

## Install
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
