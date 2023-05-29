#!/usr/bin/env node
import input from '@inquirer/input';
import select from '@inquirer/select';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

import choices from './choices.js';

// CLI interactions
const projectName = await input({ message: 'Enter the project name:' });

const projectType = await select({
  message: 'Select the project type:',
  choices,
});

// Sets project directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const boilerplatePath = `${__dirname}/boilerplates/${projectType}`;
const projectPath = `./${projectName}`;

// Copies the boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

console.log(`Project ${projectName} successfully created!`);

// Define path to install depencies and run command
const navigateCommand = `cd ${projectName}`;
const installCommand = 'npm i';

exec(`${navigateCommand} && ${installCommand}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Command error: ${stderr}`);
    return;
  }
  console.log(`Dependencies installed successfully on ${projectName}`);
});
