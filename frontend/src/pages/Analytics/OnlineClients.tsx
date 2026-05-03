import { sseContract } from "@shared/contract";
import { useEffect, useState, type ReactNode } from "react";
import { BASE_URL } from "../../constants";

interface OnlineClientsProps {
  domain: string;
}

export function OnlineClients({ domain }: OnlineClientsProps): ReactNode {
  const [countOnline, setCountOnline] = useState(0);

  useEffect(() => {
    const es = new EventSource(
      `${BASE_URL}${sseContract.onlineClients.path}?domain=${domain}`,
    );

    es.onmessage = (event) => {
      const data = sseContract.onlineClients.responses[200].parse(
        JSON.parse(event.data),
      );
      setCountOnline(data.count);
    };

    return () => es.close();
  }, [domain]);

  return (
    <div className="p-4 rounded-lg my-4 bg-surface-bright h-fit w-fit">
      <span className="text-on-surface text-lg">{countOnline}</span>
    </div>
  );
}
