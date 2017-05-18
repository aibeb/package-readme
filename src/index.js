#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import Readme from './readme';
import Structure from './structure';

if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
  const start = async () => {
    const packageJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
    const readme = new Readme(packageJSON.name, packageJSON.description,
    packageJSON.repository ? packageJSON.repository.url : packageJSON.homepage);
    readme.keywords = packageJSON.keywords;
    readme.structure = `${new Structure().recursion(process.cwd()).line}`;
    const author = packageJSON.author.split(' ');
    readme.author = {
      name: author[0],
      email: author[1],
      url: author[2],
    };
    readme.contributors = packageJSON.contributors;
    readme.license = packageJSON.license;

    const questions = [
      {
        type: 'input',
        name: 'namespace',
        message: `Use ${readme.author.name} as namespace, useage: https://github.com/{namespace}/package-readme?`,
        default: readme.author.name,
        when(answers) {
          return answers.overwrite;
        },
      },
    ];
    if (fs.existsSync(path.join(process.cwd(), 'README.md'))) {
      questions.push({
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite README.md ?',
        default: false,
      });
    }
    const answers = await inquirer.prompt(questions);
    readme.namespace = answers.namespace;
    if (answers.overwrite) {
      readme.save();
    } else {
      process.stdout.write(`Abandon write README.md on ${process.cwd()}`);
    }
  };

  start();
} else {
  process.stdout.write(`Can't find package.json, Abandon write README.md on ${process.cwd()}`);
}
