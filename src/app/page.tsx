"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { toast } from "sonner";
import { LogOutButton } from "./logOut";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  // await requireAuth();
  // const {data} = authClient.useSession();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success('Job queued');
    }
  }));
  const testAI = useMutation(trpc.testAI.mutationOptions({
    onSuccess: (data) => {
      console.log('data', data);
      toast.success(data.message);
    }
  }))
  console.log('data', data);

  return (
    <>
      <div className="text-red-500 flex flex-col gap-y-6 items-center">
        <div>
         Protected server component
        </div>
        <div>{JSON.stringify(data, null, 2)}</div>
        <div className="flex gap-x-4">
          {/* <LogOutButton></LogOutButton> */}
          <Button onClick={() => create.mutate()} disabled={create.isPending}>Create Workflow</Button>
          <Button onClick={() => testAI.mutate()} disabled={testAI.isPending}>Test AI</Button>
        </div>
      </div>

      {/* <Button onClick={() => authClient.signOut()}>Sign Out</Button> */}
    </>
  )
}

export default Page;