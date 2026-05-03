import { Path } from "@shared/types";
import { DomainsCollection } from "@shared/types/firestore";
import { firestore } from "../config/firestore";
import { OnlineClientsOutDto } from "../dtos/sse.dto";
import { getOnlineThreshold } from "../utils/getOnlineThreshold";

const INTERVAL_TIME = 1_000;

const WORKER_LAST_SEEN: Path<DomainsCollection> = "worker.timestamp";

export const sseService = {
  onlineClients(
    domain: string,
    callback: (data: OnlineClientsOutDto) => void,
  ): () => void {
    let analytics: DomainsCollection[] = [];

    const unsubscribe = firestore
      .collection(domain)
      .where(WORKER_LAST_SEEN, ">", getOnlineThreshold())
      .onSnapshot((snapshot) => {
        analytics = snapshot.docs.map((doc) =>
          doc.data(),
        ) as DomainsCollection[];
      });

    const interval = setInterval(() => {
      const countOnline = analytics.filter((item) =>
        item.events?.some((event) => event.timestamp > getOnlineThreshold()),
      ).length;

      callback({ count: countOnline });
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  },
};
