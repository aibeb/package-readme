#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import Readme from './readme';
import Structure from './structure';
import Author from './author';
import packageJSON from '../package.json';

const questions = [
  {
    type: 'confirm',
    name: 'overwrite',
    message: 'Overwrite README.md ?',
    default: false,
  },
];

const readme = new Readme(packageJSON.name, packageJSON.description);
readme.keywords = packageJSON.keywords;
readme.structure = `${new Structure().recursion(process.cwd()).line}`;
readme.author = new Author(packageJSON.author).toString();
readme.contributors = packageJSON.contributors;
readme.license = packageJSON.license;

const start = async () => {
  const oldReadme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  if (oldReadme) {
    const answers = await inquirer.prompt(questions);
    if (answers.overwrite) {
      readme.save();
    } else {
      process.stdout.write(`Abandon write README.md on ${process.cwd()}`);
    }
  } else {
    readme.save();
  }
};

start();
