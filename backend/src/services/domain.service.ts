import { Path } from '../../../shared/src/types';
import { DomainsCollection } from '../../../shared/src/types/firestore';
import { firestore } from "../config/firestore";
import { CLIENT_COLLECTION } from "../constants";
import { ListDomainsOutDto } from '../dtos/domain.dto';

const ORDER_BY: Path<DomainsCollection> = 'client.timestamp'

export const domainService = {
  async list(): Promise<ListDomainsOutDto[]> {
    const collections = await firestore.listCollections();

    const filteredCollections = collections.filter((col) => col.id !== CLIENT_COLLECTION);

    const results = await Promise.all(
      filteredCollections.map(async (col) => {
        const snapshot = await col
          .orderBy(ORDER_BY, "desc")
          .limit(1)
          .get();

        if (snapshot.empty) {
          return {
            domain: col.id,
            hasUnreadAnalytics: false,
          };
        }

        const doc = snapshot.docs[0];
        const data = doc.data() as DomainsCollection;

        const hasUnreadAnalytics = !data.clientId;

        return {
          domain: col.id,
          hasUnreadAnalytics,
        };
      })
    );

    return results;
  },
};
