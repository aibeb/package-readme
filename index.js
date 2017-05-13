import fs from 'fs';
import path from 'path';
import Readme from './src/readme';
import Structure from './src/structure';
import Author from './src/author';
import packageJSON from './package.json';

const readme = new Readme(packageJSON.name, packageJSON.description);
readme.keywords = packageJSON.keywords;
readme.structure = `${new Structure().recursion(process.cwd()).line}`;
readme.author = new Author(packageJSON.author).toString();
readme.contributors = packageJSON.contributors;
readme.license = packageJSON.license;

fs.writeFile(path.join(process.cwd(), 'README.md'), readme.toString(), (err) => {
  if (err) throw err;
});
process.stdout.write(`Write README.md on ${process.cwd()}`);
