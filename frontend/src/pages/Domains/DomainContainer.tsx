import type { ReactNode } from "react";

interface DomainContainerProperties {
  domain: string;
  hasUnreadAnalytics: boolean;
}

export function DomainContainer({
  domain,
  hasUnreadAnalytics,
}: DomainContainerProperties): ReactNode {
  return (
    <div className="border border-outline rounded-lg p-4 w-full flex gap-4 hover:bg-surface-bright cursor-pointer">
      <span className="text-lg text-on-surface flex-1">{domain}</span>
      {hasUnreadAnalytics && (
        <span className="text-md text-primary">● New analytics</span>
      )}
    </div>
  );
}
