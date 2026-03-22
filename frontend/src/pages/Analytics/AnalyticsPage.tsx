import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { api } from "../../constants";
import { analyticsRoute } from "../../routes";

export function AnalyticsPage(): ReactNode {
  const { domain } = analyticsRoute.useParams();

  const { data, isFetching } = api.analytics.list.useQuery(
    ["analyticsList", domain],
    {
      query: {
        domain,
      },
    }
  );

  if (isFetching) {
    return <div>Loading...</div>; // 🌠 generic loading
  }

  if (data?.status !== 200) {
    return <div>Error</div>; // 🌠 generic error
  }
  console.log("🌠 data: ", data.body);

  return (
    <div>
      <Header title={domain} />
    </div>
  );
}
