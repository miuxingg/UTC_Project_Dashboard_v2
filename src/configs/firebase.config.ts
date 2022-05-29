import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAepz63al_CI2ZIJiJrNjKmWCUDPPdCzNA',
  authDomain: 'book-store-storages.firebaseapp.com',
  projectId: 'book-store-storages',
  storageBucket: 'book-store-storages.appspot.com',
  messagingSenderId: '856037788297',
  appId: '1:856037788297:web:083dbf88b189e77b9bd458',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
