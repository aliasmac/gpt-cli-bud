#!/usr/bin/env node
const program = require('commander');

const { askQuestion } = require('./askQuestion');

program.version('1.0.0');

function setupAndRunProgram() {
  program.addCommand(askQuestion);
  program.parse(process.argv);
}

setupAndRunProgram();
