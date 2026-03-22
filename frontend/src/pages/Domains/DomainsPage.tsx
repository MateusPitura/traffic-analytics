import type { ReactNode } from 'react';
import { api } from '../../constants';

export function DomainsPage(): ReactNode {
  const { data, isFetching } = api.domains.list.useQuery(["domainsList"]);
  
  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (data?.status !== 200) {
    return <div>Error</div>;
  }

  return (
      <div>
        {data.body.map(({ domain, hasUnreadAnalytics }) => (
          <p key={domain}>
            Name: {domain}. New: {hasUnreadAnalytics ? "true" : "false"}{" "}
          </p>
        ))}
      </div>
  );
}