import { contract } from "@shared/contract";
import { ClientInferResponseBody } from "@ts-rest/core";
import type { ReactNode } from "react";
import Spinner from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";
import { api } from "../../constants";
import { AnalyticsTableRow } from "./AnalyticsTableRow";
import { EventContainer } from "./EventContainer";

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
  const { data: clientListData, isFetching: isFetchingClientList } = api.clients.list.useQuery(["clientsList"]);

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

  return data.payload.map((item) => (
    <AnalyticsTableRow
      item={item}
      domain={domain}
      clientList={clientListData?.body}
    >
      <Table.Accordion>
        <div className="flex flex-col gap-2 py-2">
          {item.events?.toReversed().map((event) => (
            <EventContainer item={event} />
          ))}
        </div>
      </Table.Accordion>
    </AnalyticsTableRow>
  ));
}
