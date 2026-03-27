import { contract } from "@shared/contract";
import { ClientInferResponses } from "@ts-rest/core";
import { useMemo, type ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Form/Checkbox";
import { Table } from "../../components/ui/Table";
import { useIsOpen } from "../../hooks/useIsOpen";
import { ArrowForward, Delete } from "../../icons";
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
  children: ReactNode;
  onClickLink: () => void;
  onClickDelete: (_: string) => void;
  isChecked: boolean;
  toggleRow: (_: string) => void;
  disabled?: boolean;
}

export function AnalyticsTableRow({
  item,
  domain,
  children,
  clientList,
  onClickDelete,
  onClickLink,
  isChecked,
  toggleRow,
  disabled,
}: AnalyticsTableRowProperties): ReactNode {
  const { worker, client, events, clientId, analyticId } = item;
  const accordion = useIsOpen();

  const foundClient = useMemo(() => {
    return clientList.find((c) => c.clientId === clientId);
  }, [clientList, clientId]);

  return (
    <>
      <Table.Row
        key={analyticId}
        onClick={events ? accordion.toggle : undefined}
      >
        <Table.Cell sticky="left">
          <Checkbox
            isChecked={isChecked}
            onClick={() => toggleRow(analyticId)}
          />
        </Table.Cell>
        <Table.Cell>
          <span className="text-amber-400 mr-1">{events?.length && "●"}</span>
          <ClientTag name={foundClient?.name} color={foundClient?.color} />
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
        <Table.Cell>
          <span className="line-clamp-2 whitespace-normal">{worker.verifiedBotCategory}</span>
        </Table.Cell>
        <Table.Cell sticky="right">
          <div className="flex" onClick={(e) => e.stopPropagation()}>
            <Button
              variant={"tertiary"}
              label={<Delete />}
              onClick={() => onClickDelete(analyticId)}
              disabled={disabled}
            />
            {!item.clientId && (
              <Button
                variant={"tertiary"}
                label={<ArrowForward />}
                onClick={onClickLink}
                disabled={disabled}
              />
            )}
          </div>
        </Table.Cell>
      </Table.Row>
      {accordion.isOpen && children}
    </>
  );
}
