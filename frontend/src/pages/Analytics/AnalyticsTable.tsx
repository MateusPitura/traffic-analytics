import { Table } from "../../components/ui/Table";
import { api } from "../../constants";
import { analyticsRoute } from "../../routes";
import { AnalyticsTableBody } from "./AnalyticsTableBody";

export function AnalyticsTable() {
  const { domain } = analyticsRoute.useParams();

  const { data, isFetching } = api.analytics.list.useQuery(
    ["analyticsList", domain],
    {
      query: {
        domain,
      },
    }
  );

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
          <Table.Head />
        </Table.Header>

        <Table.Body>
          <AnalyticsTableBody
            data={data?.body}
            isLoading={isFetching}
            domain={domain}
          />
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
