import { useMemo, type ReactNode } from "react";
import { api } from "../../constants";
import { DomainContainer } from "./DomainContainer";

export function DomainsPage(): ReactNode {
  const { data, isFetching } = api.domains.list.useQuery(["domainsList"]); // 🌠 configure type for query key

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

  if (isFetching) {
    return <div>Loading...</div>; // 🌠 generic loading
  }

  if (data?.status !== 200) {
    return <div>Error</div>; // 🌠 generic error
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-on-surface text-4xl font-medium">Domains</h2>
      <div className="flex flex-col gap-4 w-full">
        {sortedDomains.map(({ domain, hasUnreadAnalytics }) => (
          <DomainContainer
            domain={domain}
            key={domain}
            hasUnreadAnalytics={hasUnreadAnalytics}
          />
        ))}
      </div>
    </div>
  );
}
