import { contract } from "@shared/contract";
import { ClientInferResponseBody } from "@ts-rest/core";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { api } from "../../constants";

export function ClientsTable() {
  const { data, isFetching } = api.clients.list.useQuery(["clientsList"]);

  return (
    <div className="flex min-h-0 flex-col h-full">
      <Table>
        <Table.Header>
          <Table.Head>Name</Table.Head>
          <Table.Head>Observations</Table.Head>
          <Table.Head />
        </Table.Header>

        <Table.Body>
          <TableBody data={data?.body || []} isLoading={isFetching} />
        </Table.Body>
      </Table>
      {/* 🌠 here don't need */}
      <div className="min-h-12 px-2 border-t border-outline flex gap-4 text-on-surface items-center">
        <span>Next</span>
        <span>Previous</span>
        <span>Showing 10 of 10</span>
      </div>
    </div>
  );
}

interface TableBodyProps {
  data: ClientInferResponseBody<typeof contract.clients.list>;
  isLoading?: boolean;
}

function TableBody({ data, isLoading }: TableBodyProps) {
  if (isLoading) {
    return (
      <Table.Empty className="flex justify-center">
        <Spinner />
      </Table.Empty>
    );
  }

  if (!data.length) {
    return <Table.Empty className="text-center">No items found</Table.Empty>;
  }

  return data.map((row) => (
    <Table.Row key={row.name} variant={"body"}>
      <Table.Cell className="max-w-fit">
        <div
          className="px-2 py-1 rounded-md font-medium"
          style={{
            backgroundColor: row.color,
          }}
        >
          {row.name}
        </div>
      </Table.Cell>
      <Table.Cell className="w-full">{row.observations}</Table.Cell>
      <Table.Cell>Actions</Table.Cell>
    </Table.Row>
  ));
}
