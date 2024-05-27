import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Regions from '../pages/Regions';
import SignUp from '../pages/SignUp';
import ThemeCategory from '../pages/ThemeCategory';
import CreatePost from '../pages/CreatePost';
import { memo } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Routers = (): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login">{currentUser ? <Navigate to="/" /> : <Login />}</Route>
            <Route path="/sign-up">{currentUser ? <Navigate to="/" /> : <SignUp />}</Route>
            <Route path="/regions" element={<Regions />} />
            <Route path="/theme" element={<ThemeCategory />} />
            <Route path="/post">{currentUser ? <Navigate to="/" /> : <CreatePost />}</Route>
        </Routes>
    );
};

interface AuthRedirectProps {
    currentUser: User | null;
    component: JSX.Element;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ currentUser, component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
    return currentUser ? null : component;
};

export default memo(Routers);
