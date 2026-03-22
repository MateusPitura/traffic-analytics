import { useMemo, type ReactNode } from "react";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { DataTableMany } from "../../components/ui/DataTableMany";
import { api } from "../../constants";
import { DomainContainer } from "./DomainContainer";

export function DomainsPage(): ReactNode {
  const { data, isFetching } = api.domains.list.useQuery(["domainsList"]);

  const sortedDomains = useMemo(() => {
    const domainsWithUnreadAnalytics = [];
    const domainsWithoutUnreadAnalytics = [];

    for (const domain of data?.body || []) {
      if (domain.hasUnreadAnalytics) domainsWithUnreadAnalytics.push(domain);
      else domainsWithoutUnreadAnalytics.push(domain);
    }

    return [
      ...domainsWithUnreadAnalytics.sort((a, b) =>
        a.domain.localeCompare(b.domain)
      ),
      ...domainsWithoutUnreadAnalytics.sort((a, b) =>
        a.domain.localeCompare(b.domain)
      ),
    ];
  }, [data?.body]);

  if (isFetching) return <Loading />;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header title="Domains" />
      <div className="flex flex-col gap-4 w-full">
        {sortedDomains.map(({ domain, hasUnreadAnalytics }) => (
          <DomainContainer
            domain={domain}
            key={domain}
            hasUnreadAnalytics={hasUnreadAnalytics}
          />
        ))}
      </div>
      <DataTableMany/>
    </div>
  );
}
