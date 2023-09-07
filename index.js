#!/usr/bin/env node
import { program } from 'commander';

import { askQuestion } from './askQuestion/index.js';

program.version('1.0.0');

function setupAndRunProgram() {
  program.addCommand(askQuestion);
  program.parse(process.argv);
}

setupAndRunProgram();
