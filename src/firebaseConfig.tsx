import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyC-BBK--gvwlr0ZEW2IXwx4MFZFGAp3Crc',
    authDomain: 'honnol-project.firebaseapp.com',
    projectId: 'honnol-project',
    storageBucket: 'honnol-project.appspot.com',
    messagingSenderId: '11325096859',
    appId: '1:11325096859:web:13745733e214228135973e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
