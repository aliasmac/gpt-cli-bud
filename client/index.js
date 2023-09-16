import { ChatGPTClient } from '@waylaidwanderer/chatgpt-api';
import dotenv from 'dotenv';
dotenv.config();

export const ChatGPT = new ChatGPTClient(process.env.GPT_CLI_API_KEY);
