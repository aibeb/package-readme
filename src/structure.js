import fs from 'fs';
import path from 'path';
import gitignore from './gitignore';

const defaultignore = ['node_modules', '.git'];
const ignores = defaultignore.concat(gitignore(process.cwd()));

class Structure {
  constructor() {
    this.title = 'Here is the structure of the app:';
  }

  recursion(dir, _line = [], _prefix = '') {
    const name = path.basename(dir);
    let prefix = _prefix;
    let line = _line;
    const item = { name };
    if (fs.statSync(dir).isDirectory()) {
      if (dir === process.cwd()) {
        line.push('.');
      } else {
        prefix += '│   ';
      }
      const files = fs.readdirSync(dir)
        .filter((file) => {
          let match = true;
          ignores.forEach((ignore) => {
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
        return this.recursion(path.join(dir, file), line, prefix);
      });
    }
    line = line.join('\n');
    return { item, line };
  }
}

export default Structure;
