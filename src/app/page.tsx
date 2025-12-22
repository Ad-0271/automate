import prisma from "@/lib/db";
import { getQueryClient, trpc } from "@/trpc/server";
import { caller } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const Page = async () => {

  const queryClient = getQueryClient();
  // const users = await caller.getUsers();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <>
      {/* <div className="text-red-500">{JSON.stringify(users)} hehehe  haha</div> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page;