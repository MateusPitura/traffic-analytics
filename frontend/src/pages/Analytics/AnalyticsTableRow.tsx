import { contract } from "@shared/contract";
import { ClientInferResponses } from "@ts-rest/core";
import { useMemo, type ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Table } from "../../components/ui/Table";
import { useIsOpen } from "../../hooks/useIsOpen";
import { cn } from "../../utils/cn";
import { ClientTag } from "../Clients/ClientTag";
import { AnalyticsTableCell } from "./AnalyticsTableCell";
import {
  formatAbsoluteDate,
  formatLocation,
  formatRelativeDate,
  formatUa,
  formatUrl,
  isGreaterThanOneMinute,
} from "./formatters";

interface AnalyticsTableRowProperties {
  item: ClientInferResponses<
    typeof contract.analytics.list,
    200
  >["body"]["payload"][number];
  clientList: ClientInferResponses<typeof contract.clients.list, 200>["body"];
  domain: string;
  children?: ReactNode;
}

export function AnalyticsTableRow({
  item,
  domain,
  children,
  clientList,
}: AnalyticsTableRowProperties): ReactNode {
  const { worker, client, events, clientId } = item;
  const accordion = useIsOpen();

  const foundClient = useMemo(() => {
    return clientList.find((c) => c.clientId === clientId);
  }, [clientList, clientId]);

  return (
    <>
      <Table.Row
        key={client.sessionId}
        variant={"body"}
        onClick={events ? accordion.toggle : undefined}
      >
        <Table.Cell className="flex gap-1 items-center">
          <span className="text-amber-400">{events?.length && "●"}</span>
          <ClientTag
            name={foundClient?.name || "Unknown"}
            color={foundClient?.color || "#000000"}
          />
        </Table.Cell>
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
              <span className="text-amber-400">
                {formatUrl(worker.referer)}
              </span>
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
        <AnalyticsTableCell
          className="max-w-28"
          tooltip={client.localStorageId}
        >
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
      {accordion.isOpen && children}
    </>
  );
}
