import { contract } from "@shared/contract";
import { ClientInferResponseBody } from "@ts-rest/core";
import type { ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { cn } from "../../utils/cn";
import { AnalyticsTableCell } from "./AnalyticsTableCell";
import {
  formatAbsoluteDate,
  formatLocation,
  formatRelativeDate,
  formatUa,
  formatUrl,
  isGreaterThanOneMinute,
} from "./formatters";

interface AnalyticsTableBodyProperties {
  data: ClientInferResponseBody<typeof contract.analytics.list> | undefined;
  isLoading?: boolean;
  domain: string;
}

export function AnalyticsTableBody({
  data,
  domain,
  isLoading,
}: AnalyticsTableBodyProperties): ReactNode {
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
      <AnalyticsTableCell
        tooltip={
          <span>
            {formatAbsoluteDate(client.timestamp)}{" "}
            {isGreaterThanOneMinute(client.timestamp, worker.timestamp) && (
              <span className="text-amber-400">
                {formatAbsoluteDate(worker.timestamp)}
              </span>
            )}
          </span>
        }
      >
        <span
          className={cn(
            isGreaterThanOneMinute(client.timestamp, worker.timestamp) &&
              "underline decoration-amber-400"
          )}
        >
          {formatRelativeDate(client.timestamp)}
        </span>
      </AnalyticsTableCell>
      <AnalyticsTableCell
        tooltip={
          client.url !== worker.referer ? (
            <span className="text-amber-400">{formatUrl(worker.referer)}</span>
          ) : (
            ""
          )
        }
      >
        <span
          className={cn(
            client.url !== worker.referer && "underline decoration-amber-400"
          )}
        >
          {formatUrl(client.url).replace(domain, "")}
        </span>
      </AnalyticsTableCell>
      <Table.Cell>{formatUrl(client.referer)}</Table.Cell>
      <AnalyticsTableCell
        tooltip={
          <span>
            {client.ua}{" "}
            {client.ua !== worker.ua && (
              <div className="text-amber-400">{worker.ua}</div>
            )}
          </span>
        }
      >
        <span
          className={cn(
            client.ua !== worker.ua && "underline decoration-amber-400"
          )}
        >
          {formatUa(client.ua)}
        </span>
      </AnalyticsTableCell>
      <AnalyticsTableCell
        tooltip={
          worker.timezone !== client.timezone ? (
            <span className="text-amber-400">{worker.timezone}</span>
          ) : undefined
        }
      >
        <span
          className={cn(
            worker.timezone !== client.timezone &&
              "underline decoration-amber-400"
          )}
        >
          {client.timezone}
        </span>
      </AnalyticsTableCell>
      <AnalyticsTableCell
        tooltip={<span className="text-amber-400">{worker.language}</span>}
      >
        <div>{client.language}</div>
      </AnalyticsTableCell>
      <AnalyticsTableCell
        tooltip={`Outer: ${client.outerWidth}x${client.outerHeight} DPR: ${client.dpr}`}
      >
        <div>{`${client.innerWidth}x${client.innerHeight}`}</div>
      </AnalyticsTableCell>
      <AnalyticsTableCell tooltip={worker.asOrganization}>
        <div>
          {worker.ip}{" "}
          {client.networkType !== "undefined" ? client.networkType : ""}{" "}
          {client.saveData === "true" ? "Save Data" : ""}
        </div>
      </AnalyticsTableCell>
      <AnalyticsTableCell className="max-w-28" tooltip={client.localStorageId}>
        <div className="truncate">{client.localStorageId}</div>
      </AnalyticsTableCell>
      <AnalyticsTableCell className="max-w-28" tooltip={client.fingerprint}>
        <div className="truncate">{client.fingerprint}</div>
      </AnalyticsTableCell>
      <AnalyticsTableCell
        className="max-w-28"
        tooltip={`
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
      </AnalyticsTableCell>
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
      <Table.Cell>
        <Button variant={"tertiary"} label="Delete" />
        <Button variant={"tertiary"} label="Link" />
      </Table.Cell>
    </Table.Row>
  ));
}
