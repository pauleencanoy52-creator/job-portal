import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtFG9KPZgfZRGh8GlOI-hNHSXdI2IMuTw",
  authDomain: "job-portal-847bb.firebaseapp.com",
  projectId: "job-portal-847bb",
  storageBucket: "job-portal-847bb.firebasestorage.app",
  messagingSenderId: "463078712629",
  appId: "1:463078712629:web:38a5efbdb9b9e6538b987c",
  measurementId: "G-JZXSRYJLQ4"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);

// SERVICES
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// EXPORT
export { app, auth, db };