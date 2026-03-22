import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { Button } from "../../components/ui/Button";
import { UserTable } from "../../components/ui/UserTable";

export function ClientsPage(): ReactNode {
  // const { data, isFetching } = api.clients.list.useQuery(["clientsList"]);

  // if (isFetching) return <Loading />;
  // console.log("🌠 data: ", data?.body[0]);

  return (
    // <UserTable />
    <div className="flex flex-col gap-4 min-w-0 w-full">
      <Header title="Clients" />
      <div className="bg-amber-200 h-96">
        <Button label="Create client" />
      </div>
      <UserTable />
    </div>
  );
}
