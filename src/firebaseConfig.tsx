import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAELJenMvviZjFq7vZIDwDNeG8MT4Zqjbk',
    authDomain: 'honnol.firebaseapp.com',
    projectId: 'honnol',
    storageBucket: 'honnol.appspot.com',
    messagingSenderId: '741781672094',
    appId: '1:741781672094:web:ff7b7e2104336dd2da2b8f',
    measurementId: 'G-G6Y43B8F5L',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
