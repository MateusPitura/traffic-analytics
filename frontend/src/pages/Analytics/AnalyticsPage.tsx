import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { analyticsRoute } from "../../routes";
import { AnalyticsTable } from "./AnalyticsTable";
import { OnlineClients } from "./OnlineClients";

export function AnalyticsPage(): ReactNode {
  const { domain } = analyticsRoute.useParams();

  return (
    <div className="flex flex-col gap-4 min-w-0 w-full">
      <Header title={domain} />
      <OnlineClients domain={domain} />
      <AnalyticsTable />
    </div>
  );
}
