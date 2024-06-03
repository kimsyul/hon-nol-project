import { createContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebaseConfig';

interface FirebaseContextType {
    currentUser: User | null;
}

export const FirebaseContext = createContext<FirebaseContextType>({ currentUser: null });

interface Props {
    children: ReactNode;
}

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    return <FirebaseContext.Provider value={{ currentUser }}>{children}</FirebaseContext.Provider>;
};
