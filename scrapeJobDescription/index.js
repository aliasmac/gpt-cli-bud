import { Command } from 'commander';
import axios from 'axios';
import cheerio from 'cheerio';
import inquirer from 'inquirer';
import { ChatGPT } from '../client/index.js';

import { jobDescriptionTemplate } from './template.js';

const jobDescriptionField = {
  jobBenefits: true,
  responsibilities: true,
  skills: true,
};

const getJobDescriptionFromWebpage = async (url) => {
  let jobDescriptionString = '';

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const jobDescription = $($('script')[0]).text();
  const parsedJobDescriptionMap = JSON.parse(jobDescription);
  const jobDescriptionKeys = Object.keys(parsedJobDescriptionMap);

  for (let i = 0; i < jobDescriptionKeys.length; i++) {
    const key = jobDescriptionKeys[i];
    const jobDesc = parsedJobDescriptionMap[jobDescriptionKeys[i]];

    if (jobDescriptionField[key]) {
      const strippedText = jobDesc.replace(/<\/?[^>]+(>|$)/g, '');
      jobDescriptionString += `
      ${strippedText}
      `;
    }
  }

  return jobDescriptionString;
};

const getUserJobQuestion = async () => {
  const { job_question } = await inquirer.prompt([
    {
      type: 'input',
      name: 'job_question',
      message: 'What question would you like to ask about the job?',
    },
  ]);

  return job_question;
};

// highlight the key job skills

const getJobDescriptionFromUrl = async (url) => {
  console.log('fteching web page');
  const jobDesc = await getJobDescriptionFromWebpage(url);
  const jobQuestion = await getUserJobQuestion();

  const messageToSend = jobDescriptionTemplate
    .replace('JOB_DESC', jobDesc)
    .replace('JOB_QUESTION', jobQuestion);

  console.log('Asking question');
  const { response } = await ChatGPT.sendMessage(messageToSend);

  console.log(response);

  // console.log('jobDesc', jobDesc);

  // I need to parse the different fields
  // strip tags from values
  // save back to array
  // add to jobDescriptionString
  // console.log('jobDescriptionKeys', jobDescriptionKeys);
  // console.log(JSON.stringify(parsedJobDescription, null, 4));
  // console.log('jobDescription', jobDescription);
};

const command = new Command()
  .command('scrape')
  .option('-u, --url, <url>')
  .description('Fetch job description and ask ChatGPT a question on it.')
  .action(({ url }) => {
    getJobDescriptionFromUrl(url);
  });

export const getJobDescription = command;
