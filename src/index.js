#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import Readme from './readme';
import Structure from './structure';
import Author from './author';
import packageJSON from '../package.json';

const readme = new Readme(packageJSON.name, packageJSON.description,
  packageJSON.repository ? packageJSON.repository.url : packageJSON.homepage);
readme.keywords = packageJSON.keywords;
readme.structure = `${new Structure().recursion(process.cwd()).line}`;
readme.author = new Author(packageJSON.author);
readme.contributors = packageJSON.contributors;
readme.license = packageJSON.license;
readme.date = new Date();

const questions = [
  {
    type: 'confirm',
    name: 'overwrite',
    message: 'Overwrite README.md ?',
    default: false,
  },
  {
    type: 'input',
    name: 'namespace',
    message: `Use ${readme.author.name} as namespace, useage: https://github.com/{namespace}/package-readme?`,
    default: readme.author.name,
  },
];

const start = async () => {
  const oldReadme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  if (oldReadme) {
    const answers = await inquirer.prompt(questions);
    readme.namespace = answers.namespace;
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
