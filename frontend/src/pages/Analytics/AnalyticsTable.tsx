import { contract } from "@shared/contract";
import { ClientInferResponseBody } from "@ts-rest/core";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { Tooltip } from "../../components/ui/Tooltip";
import { api } from "../../constants";
import { analyticsRoute } from "../../routes";
import {
  formatAbsoluteDate,
  formatLocation,
  formatRelativeDate,
  formatUa,
  formatUrl,
} from "./formatters";

export function AnalyticsTable() {
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
          <Table.Head>Date</Table.Head>
          <Table.Head>URL</Table.Head>
          <Table.Head>Referer</Table.Head>
          <Table.Head>UA</Table.Head>
          <Table.Head>Time Zone</Table.Head>
          <Table.Head>Language</Table.Head>
          <Table.Head>Screen</Table.Head>
          <Table.Head>Connection</Table.Head>
          <Table.Head>LocalStorage</Table.Head>
          <Table.Head>Fingerprint</Table.Head>
          <Table.Head>Cookie</Table.Head>
          <Table.Head>Location</Table.Head>
          <Table.Head>Bot</Table.Head>
        </Table.Header>

        <Table.Body>
          <TableBody data={data?.body} isLoading={isFetching} domain={domain} />
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
  domain: string;
}

function TableBody({ data, isLoading, domain }: TableBodyProps) {
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

  return data.payload.map(({ client, worker }) => (
    <Table.Row key={client.sessionId} variant={"body"}>
      <Table.Cell>
        <Tooltip
          content={
            <span>
              {formatAbsoluteDate(client.timestamp)}{" "}
              <span className="text-amber-400">
                {formatAbsoluteDate(worker.timestamp)}
              </span>
            </span>
          }
        >
          <div>{formatRelativeDate(client.timestamp)}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>{formatUrl(client.url).replace(domain, "")}</Table.Cell>
      <Table.Cell>{formatUrl(client.referer)}</Table.Cell>
      <Table.Cell>
        <Tooltip content={client.ua}>{formatUa(client.ua)}</Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={<span className="text-amber-400">{worker.timezone}</span>}
        >
          <div>{client.timezone}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={<span className="text-amber-400">{worker.language}</span>}
        >
          <div>{client.language}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip
          content={`Outer: ${client.outerWidth}x${client.outerHeight} DPR: ${client.dpr}`}
        >
          <div>{`${client.innerWidth}x${client.innerHeight}`}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        <Tooltip content={worker.asOrganization}>
          <div>
            {worker.ip} {client.type !== "undefined" ? client.type : ""}{" "}
            {client.saveData === "true" ? "Save Data" : ""}
          </div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell className="max-w-28">
        <Tooltip content={client.localStorageId}>
          <div className="truncate">{client.localStorageId}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell className="max-w-28">
        <Tooltip content={client.fingerprint}>
          <div className="truncate">{client.fingerprint}</div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell className="max-w-28">
        <Tooltip
          content={`
            ${client.cookieEnabled === "false" ? "Cookies Disabled" : ""}
            ${worker.cookieId} 
          `}
        >
          <div className="truncate">
            <span className="text-error">
              {client.cookieEnabled === "false" ? "● " : ""}
            </span>
            {worker.cookieId}
          </div>
        </Tooltip>
      </Table.Cell>
      <Table.Cell>
        {formatLocation(
          worker.country,
          worker.region,
          worker.city,
          worker.latitude,
          worker.longitude
        )}
      </Table.Cell>
      <Table.Cell>{`${worker.verifiedBotCategory}`}</Table.Cell>
    </Table.Row>
  ));
}
