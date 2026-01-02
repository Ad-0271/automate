// import { z } from 'zod';
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
// import { email } from 'zod';
export const appRouter = createTRPCRouter({
  // getUsers: protectedProcedure
  //   .query(({ctx}) => {
  //       // console.log('user ctx', ctx);
  //     return prisma.user.findMany({
  //       where: {
  //           id: ctx.auth.user.id,
  //       }
  //     });
  //   }),
    testAI: protectedProcedure.mutation(async () => {
      await inngest.send({
        name: 'execute/ai',
        data: {
          prompt: 'Write a vegetarian lasagna recipe for 4 people.',
        }
      });

      return {success: true, message: 'AI job queued'};

    }),
    getWorkflows: protectedProcedure
    .query(({ctx}) => {
        return prisma.workflow.findMany();
    }),
    createWorkflow: protectedProcedure
    .mutation( async ({ctx, input}) => {
      await inngest.send({
        name: 'this-is-event-buddy',
        data: {
          email: 'hehehe',
        }
      })
      
        return {success: true, message: 'Job queued'};
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;