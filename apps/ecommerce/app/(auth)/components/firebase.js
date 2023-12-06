import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCkbos_gL2IipOro8KNgh7IIgnfcr1A7Mk',
  authDomain: 'maduka-3c2e0.firebaseapp.com',
  projectId: 'maduka-3c2e0',
  storageBucket: 'maduka-3c2e0.appspot.com',
  messagingSenderId: '599786621017',
  appId: '1:599786621017:web:40b5b2e53090e1636ac948',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
