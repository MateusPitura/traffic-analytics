import { contract } from "@shared/contract";
import { ClientInferResponses } from "@ts-rest/core";
import { type ReactNode, useMemo } from "react";
import { Button } from "../../components/ui/Button";
import { Tooltip } from "../../components/ui/Tooltip";
import { ClientTag } from "../Clients/ClientTag";

interface LinkClientFormProperties {
  clientList: ClientInferResponses<typeof contract.clients.list, 200>["body"];
  analyticItem:
    | ClientInferResponses<
        typeof contract.analytics.list,
        200
      >["body"]["payload"][number];
  onClickLink: (_: string) => void;
  isLoading: boolean;
}

export function LinkClientForm({
  clientList,
  analyticItem,
  onClickLink,
  isLoading
}: LinkClientFormProperties): ReactNode {
  const clientsWithMatchAnalytic = useMemo(() => {
    const { client, worker } = analyticItem;

    const clientsWithMatch = [];
    for (const clientItem of clientList) {
      const matches = [];
      if (clientItem.linkedCookieId.some((item) => item === worker.cookieId)) {
        matches.push("Cookie");
      }
      if (clientItem.linkedIp.some((item) => item === worker.ip)) {
        matches.push("IP");
      }
      if (
        clientItem.linkedFingerprint.some((item) => item === client.fingerprint)
      ) {
        matches.push("Fingerprint");
      }
      if (
        clientItem.linkedLocalStorageId.some(
          (item) => item === client.localStorageId
        )
      ) {
        matches.push("LocalStorage");
      }
      clientsWithMatch.push({
        ...clientItem,
        matches,
      });
    }
    return clientsWithMatch.toSorted((a, b) => b.matches.length - a.matches.length);
  }, [analyticItem, clientList]);

  return clientsWithMatchAnalytic.map((client) => {
    return (
      <div key={client.clientId} className="flex gap-2 items-center">
        <ClientTag name={client.name} color={client.color} />
        <Tooltip content={client.matches.join(", ")} disabled={!client.matches.length}>
          <div className="text-primary">{client.matches.length}</div>
        </Tooltip>
        <Button
          label="Link"
          variant={"tertiary"}
          onClick={() => onClickLink(client.clientId)}
          disabled={isLoading}
        />
      </div>
    );
  });
}
