import { contract } from "@shared/contract";
import { ClientInferResponseBody, ClientInferResponses } from "@ts-rest/core";
import { useState, type ReactNode } from "react";
import { Dialog } from "../../components/ui/Dialog";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { api } from "../../constants";
import { queryClient } from "../../constants/reactQuery";
import { AnalyticsTableRow } from "./AnalyticsTableRow";
import { EventContainer } from "./EventContainer";
import { LinkClientForm } from "./LinkClientForm";

interface AnalyticsTableBodyProperties {
  data: ClientInferResponseBody<typeof contract.analytics.list> | undefined;
  isLoading?: boolean;
  domain: string;
}

interface LinkClientDialogProps {
  isOpen: boolean;
  analyticItem:
    | ClientInferResponses<
        typeof contract.analytics.list,
        200
      >["body"]["payload"][number]
    | null;
}

export function AnalyticsTableBody({
  data,
  domain,
  isLoading,
}: AnalyticsTableBodyProperties): ReactNode {
  const { data: clientListData, isFetching: isFetchingClientList } =
    api.clients.list.useQuery(["clientsList"]);

  const [linkClientDialog, setLinkClientDialog] =
    useState<LinkClientDialogProps>({
      analyticItem: null,
      isOpen: false,
    });

  const { mutate: linkToClient, isPending: isLinkingToClient } =
    api.analytics.linkToClient.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["analyticsList"] });
        queryClient.invalidateQueries({ queryKey: ["clientsList"] });
        setLinkClientDialog({ analyticItem: null, isOpen: false });
      },
    });

  if (isLoading || isFetchingClientList) {
    return (
      <Table.Empty className="flex justify-center">
        <Spinner />
      </Table.Empty>
    );
  }

  if (!data?.payload?.length || !clientListData?.body) {
    return <Table.Empty className="text-center">No items found</Table.Empty>;
  }

  return (
    <>
      <Dialog
        isOpen={linkClientDialog.isOpen}
        onClose={() =>
          setLinkClientDialog((prev) => ({ ...prev, isOpen: false }))
        }
        title="Link Client"
      >
        <LinkClientForm
          clientList={clientListData.body}
          analyticItem={linkClientDialog.analyticItem!}
          onClickLink={(clientId) =>
            linkToClient({
              body: {
                analyticId: linkClientDialog.analyticItem?.analyticId as string,
                clientId,
                domain,
              },
            })
          }
          isLoading={isLinkingToClient}
        />
      </Dialog>
      {data.payload.map((item) => (
        <AnalyticsTableRow
          item={item}
          domain={domain}
          clientList={clientListData?.body}
          onClickLink={() =>
            setLinkClientDialog({ analyticItem: item, isOpen: true })
          }
          onClickDelete={() => {}}
          key={item.analyticId}
        >
          <Table.Accordion>
            <div className="flex flex-col gap-2 py-2">
              {item.events?.toReversed().map((event) => (
                <EventContainer item={event} key={event.timestamp} />
              ))}
            </div>
          </Table.Accordion>
        </AnalyticsTableRow>
      ))}
    </>
  );
}
