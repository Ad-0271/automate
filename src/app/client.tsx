"use client";

import { useTRPC } from "@/trpc/client";
// import { trpc } from "@/trpc/server";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    // useTRPC?
    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div>
            <h1>Client {JSON.stringify(users)}</h1>
        </div>
    )
}