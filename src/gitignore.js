import fs from 'fs';
import path from 'path';

export default (dir) => {
  const content = fs.readFileSync(path.join(dir, '.gitignore'), 'utf8');
  return content.split('\n').map(line => line.trim()).filter(line => line && line[0] !== '#');
};
