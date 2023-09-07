import { Command } from 'commander';

const askQuestionCallback = async (question) => {
  console.log('question', question);
};

const command = new Command()
  .command('ask')
  .option('-q, --question, <question>')
  .description('Ask ChatGPT a question')
  .action(({ question }) => {
    askQuestionCallback(question);
  });

export const askQuestion = command;
