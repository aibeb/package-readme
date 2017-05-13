import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import Readme from './app/readme';
import Structure from './app/structure';
import Author from './app/author';
import packageJSON from './package.json';


const readme = new Readme(packageJSON.name, packageJSON.description);
readme.install = 'install';
readme.usage = 'usage';
readme.keywords = packageJSON.keywords;
readme.structure = `${new Structure().recursion(process.cwd()).line}`;
readme.author = new Author(packageJSON.author).toString();
readme.contributors = packageJSON.contributors;
readme.license = packageJSON.license;

const questions = [];

Object.entries(readme).forEach(([k, v]) => {
  questions.push({
    type: 'input',
    name: k,
    message: `Generate ${k}\n`,
    default: v,
  });
});

inquirer.prompt(questions).then((answer) => {
  // const readme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  let contents = '';
  Object.entries(answer).forEach(([k, v]) => {
    contents += `## ${k}\n`;
    contents += `${v}\n\n`;
  });
  fs.writeFile(path.join(process.cwd(), 'README.md'), readme.toString(), (err) => {
    if (err) throw err;
  });
  process.stdout.write(`Write README.md on ${process.cwd()}`);
});
