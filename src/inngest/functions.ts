import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    try {
      const {steps: geminiSteps} = await step.ai.wrap("gemini-generate-text", generateText, {
        model: google('gemini-2.5-flash'),
        system: 'You are a helpful assistant',
        prompt: 'What is 2 +27?'
      })
      
      const {steps: openAISteps} = await step.ai.wrap("openai-generate-text", generateText, {
        model: openai('gpt-4o'),
        system: 'You are a helpful assistant',
        prompt: 'What is 2 +27?'
      })

      const {steps: anhtorpicSteps} = await step.ai.wrap("anthropic-generate-text", generateText, {
        model: anthropic('claude-3-5-sonnet'),
        system: 'You are a helpful assistant',
        prompt: 'What is 2 +27?'
      })



      return {geminiSteps, openAISteps, anhtorpicSteps};
    } catch (error) {
      console.error('Error executing AI', error);
      return { error: 'Failed to execute AI' };
    }
  }
);