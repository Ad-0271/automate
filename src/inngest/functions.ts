import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world-function" },
  { event: "this-is-event-buddy" },
  async ({ event, step }) => {
      await step.sleep("wait-a-moment", "5s");
      await step.sleep("wait-a-moment", "5s");
      await step.sleep("wait-a-moment", "5s");

      await step.run("create-workflow", async () => {
        return prisma.workflow.create({
          data: {
            name: 'test-workflow',
          }
        })
      })

    //   return { message: `Hello ${event.data.email}! this is kind of confusing right now` };
    },
);