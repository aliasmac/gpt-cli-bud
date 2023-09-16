#!/usr/bin/env node
import { program } from 'commander';

import { askQuestion } from './askQuestion/index.js';
import { getJobDescription } from './scrapeJobDescription/index.js';

program.version('1.0.0');

function setupAndRunProgram() {
  program.addCommand(askQuestion);
  program.addCommand(getJobDescription);
  program.parse(process.argv);
}

setupAndRunProgram();
