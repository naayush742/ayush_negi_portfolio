import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ayushnegi-82cbc.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ayushnegi-82cbc',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ayushnegi-82cbc.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Initialize Firebase Analytics if supported and measurementId/appId is set
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported && (firebaseConfig.measurementId || firebaseConfig.appId)) {
      try {
        analytics = getAnalytics(app);
      } catch (err) {
        // Analytics already initialized or config unavailable
      }
    }
  });
}

export default app;
