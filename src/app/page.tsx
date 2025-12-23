// "use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { toast } from "sonner";
import { LogOutButton } from "./logOut";

const Page = async () => {
  await requireAuth();
  // const {data} = authClient.useSession();
  const data = await caller.getUsers();
  console.log('data', data);

  return (
    <>
      <div className="text-red-500 flex flex-col gap-y-6 items-center">
        <div>
         Protected server component
        </div>
        <div>{JSON.stringify(data, null, 2)}</div>
        <div>
          <LogOutButton></LogOutButton>
        </div>
      </div>

      {/* <Button onClick={() => authClient.signOut()}>Sign Out</Button> */}
    </>
  )
}

export default Page;