import { Command } from 'commander';
import { ChatGPT } from '../client/index.js';

const askQuestionCallback = async (question) => {
  console.log('Asking ChatGPT a question');

  try {
    const { response } = await ChatGPT.sendMessage(question);

    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
};

const command = new Command()
  .command('ask')
  .option('-q, --question, <question>')
  .description('Ask ChatGPT a question')
  .action(({ question }) => {
    askQuestionCallback(question);
  });

export const askQuestion = command;
