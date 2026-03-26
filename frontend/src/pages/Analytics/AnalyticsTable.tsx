import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Form/Checkbox";
import { Table } from "../../components/ui/Table";
import { useTableCheckbox } from "../../components/ui/Table/useTableCheckbox";
import { api } from "../../constants";
import { analyticsRoute } from "../../routes";
import { AnalyticsTableBody } from "./AnalyticsTableBody";
import { useFilters } from "./useFilters";
import { usePagination } from "./usePagination";

export function AnalyticsTable() {
  const { domain } = analyticsRoute.useParams();

  const { filters, setFilters } = useFilters();
  const { cursorStack, handleNext, handlePrevious } = usePagination({
    setFilters,
  });

  const query = {
    ...filters,
    domain,
  };

  const { data: analyticsData, isFetching: isFetchingAnalytics } =
    api.analytics.list.useQuery(["analyticsList", query], {
      query,
    });

  const {
    allSelected,
    isIndeterminate,
    selected,
    toggleAll,
    toggleRow,
    clearSelection,
  } = useTableCheckbox({
    payload: analyticsData?.body.payload.map((item) => item.analyticId) || [],
  });

  return (
    <div className="flex min-h-0 flex-col h-full">
      <Table>
        <Table.Header>
          <Table.Head sticky="left">
            <Checkbox
              isChecked={allSelected}
              onClick={toggleAll}
              isIndeterminate={isIndeterminate}
            />
          </Table.Head>
          <Table.Head>Client</Table.Head>
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
          <Table.Head sticky="right" />
        </Table.Header>

        <Table.Body>
          <AnalyticsTableBody
            data={analyticsData?.body}
            isLoading={isFetchingAnalytics}
            domain={domain}
            selected={selected}
            toggleRow={toggleRow}
            clearSelection={clearSelection}
          />
        </Table.Body>
      </Table>
      <div className="min-h-12 px-2 border-t border-outline flex gap-4 text-on-surface items-center">
        {cursorStack.length > 0 && (
          <Button
            variant="tertiary"
            label="Previous"
            onClick={handlePrevious}
          />
        )}
        {analyticsData?.body.hasMore && (
          <Button
            variant="tertiary"
            label="Next"
            onClick={() => {
              if (analyticsData.body.nextCursor) {
                handleNext(analyticsData.body.nextCursor);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
