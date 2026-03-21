import type { ServiceAccount } from "firebase-admin";
import admin from "firebase-admin";
import serviceAccount from '../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const adminDb = admin.firestore();