import { contract } from "@shared/contract";
import { useNavigate } from "@tanstack/react-router";
import { ClientInferResponseBody } from "@ts-rest/core";
import { Button } from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { Tooltip } from "../../components/ui/Tooltip";
import { api } from "../../constants";
import { Arrow, Edit } from "../../icons";
import { ClientTag } from "./ClientTag";
import { ClientInputs } from "./types";

interface ClientsTableProps {
  onEditClient: (clientId: string, defaultValues: ClientInputs) => void;
}

export function ClientsTable({ onEditClient }: ClientsTableProps) {
  const { data, isFetching } = api.clients.list.useQuery(["clientsList"]);

  return (
    <div className="flex min-h-0 flex-col h-full">
      <Table.Container>
        <Table>
          <Table.Header>
            <Table.Head>Name</Table.Head>
            <Table.Head>Observations</Table.Head>
            <Table.Head />
          </Table.Header>

          <Table.Body>
            <TableBody
              data={data?.body || []}
              isLoading={isFetching}
              onEditClient={onEditClient}
            />
          </Table.Body>
        </Table>
      </Table.Container>
    </div>
  );
}

interface TableBodyProps {
  data: ClientInferResponseBody<typeof contract.clients.list>;
  isLoading?: boolean;
  onEditClient: (clientId: string, defaultValues: ClientInputs) => void;
}

function TableBody({ data, isLoading, onEditClient }: TableBodyProps) {
  const navigate = useNavigate({
    from: "/clients",
  });

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
    <Table.Row key={row.clientId}>
      <Table.Cell className="max-w-fit">
        <ClientTag name={row.name} color={row.color} />
      </Table.Cell>
      <Table.Cell className="w-full">{row.observations}</Table.Cell>
      <Table.Cell>
        <Button
          variant={"tertiary"}
          label={<Edit />}
          onClick={() => {
            onEditClient(row.clientId, {
              fullName: row.name,
              color: row.color,
              observations: row.observations,
            });
          }}
        />
        {!!row.linkedHostname.length && (
          <Tooltip content={row.linkedHostname.join(", ")} asChild={false}>
            <Button
              variant={"tertiary"}
              label={<Arrow />}
              onClick={() => {
                navigate({
                  to: "/analytics/$domain",
                  params: {
                    domain: row.linkedHostname[0],
                  },
                  search: {
                    clientId: row.clientId,
                  },
                });
              }}
            />
          </Tooltip>
        )}
      </Table.Cell>
    </Table.Row>
  ));
}
