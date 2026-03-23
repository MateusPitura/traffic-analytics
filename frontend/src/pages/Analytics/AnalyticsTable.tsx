import { contract } from "@shared/contract";
import { ClientInferResponseBody } from "@ts-rest/core";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { Tooltip } from "../../components/ui/Tooltip";
import { api } from "../../constants";
import { analyticsRoute } from "../../routes";
import { formatUA, removeProtocol } from "./formatters";

// interface AnalyticsTableProps {}

export function AnalyticsTable() {
  // { onEditClient }: AnalyticsTableProps
  const { domain } = analyticsRoute.useParams();

  const { data, isFetching } = api.analytics.list.useQuery(["analyticsList"], {
    query: {
      domain,
    },
  });

  return (
    <div className="flex min-h-0 flex-col h-full">
      <Table>
        <Table.Header>
          <Table.Head>URL</Table.Head>
          <Table.Head>LocalStorage</Table.Head>
          <Table.Head>Referer</Table.Head>
          {/* format it */}
          <Table.Head>UA</Table.Head>
          <Table.Head>TimeZone</Table.Head>
          <Table.Head>Language</Table.Head>
          {/* inner and outer width, dpr */}
          <Table.Head>Screen</Table.Head>
          {/* type and save data */}
          <Table.Head>Connection</Table.Head>
          {/* relate to cookie */}
          <Table.Head>Cookie Enabled</Table.Head>
          <Table.Head>Fingerprint</Table.Head>
          <Table.Head />
        </Table.Header>

        <Table.Body>
          <TableBody data={data?.body} isLoading={isFetching} />
        </Table.Body>
      </Table>
      <div className="min-h-12 px-2 border-t border-outline flex gap-4 text-on-surface items-center">
        <span>Next</span>
        <span>Previous</span>
        <span>Showing 10 of 10</span>
      </div>
    </div>
  );
}

interface TableBodyProps {
  data: ClientInferResponseBody<typeof contract.analytics.list> | undefined;
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

  if (!data?.payload?.length) {
    return <Table.Empty className="text-center">No items found</Table.Empty>;
  }

  return data.payload.map((row) => (
    <Table.Row key={row.client.sessionId} variant={"body"}>
      <Table.Cell>{removeProtocol(row.client.url)}</Table.Cell>
      <Table.Cell className="max-w-28">
        <Tooltip content={row.client.localStorageId}>
          <div className="truncate">{row.client.localStorageId}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{removeProtocol(row.client.referer)}</Table.Cell>
      <Table.Cell>{formatUA(row.client.ua)}</Table.Cell>
      <Table.Cell>{row.client.timezone}</Table.Cell>
      <Table.Cell>{row.client.language}</Table.Cell>
      <Table.Cell>{row.client.innerHeight}</Table.Cell>
      <Table.Cell>{row.client.saveData}</Table.Cell>
      <Table.Cell>{row.client.cookieEnabled}</Table.Cell>
      <Table.Cell className="max-w-28">
        <Tooltip content={row.client.fingerprint}>
          <div className="truncate">{row.client.fingerprint}</div>
        </Tooltip>
      </Table.Cell>
    </Table.Row>
  ));
}
