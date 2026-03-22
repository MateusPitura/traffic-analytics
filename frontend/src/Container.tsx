import { contract } from '@shared/contract';
import { initQueryClient } from '@ts-rest/react-query';
import type { ReactNode } from 'react';

const api = initQueryClient(contract, {
  baseUrl: "http://localhost:3000",
});

export function Container(): ReactNode {
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