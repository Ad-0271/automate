// import { z } from 'zod';
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
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