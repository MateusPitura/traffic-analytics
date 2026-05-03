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
    <div className="p-4 rounded-lg my-4 bg-surface-bright h-fit w-fit flex items-center gap-2">
      {countOnline === 0 ? (
        <div className="h-2 w-2 rounded-full bg-red-400" />
      ) : (
        <div className="h-2 w-2 rounded-full bg-green-400 relative">
          <div className="h-2 w-2 rounded-full bg-green-400 absolute top-0 left-0 z-10 animate-ping" />
        </div>
      )}
      <span className="text-on-surface text-md">Online:</span>
      <span className="text-on-surface text-lg">{countOnline}</span>
    </div>
  );
}
