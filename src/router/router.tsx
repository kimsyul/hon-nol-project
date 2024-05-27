import { Routes, Route } from 'react-router-dom';
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
import AuthRedirect from './AuthRedirect';
import ProtectedRoute from './ProtectedRoute';

const AppRouterComponent = (): JSX.Element => {
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
            <Route path="/login" element={<AuthRedirect currentUser={currentUser} component={<Login />} />} />
            <Route path="/sign-up" element={<AuthRedirect currentUser={currentUser} component={<SignUp />} />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/theme" element={<ThemeCategory />} />
            <Route path="/post" element={<ProtectedRoute currentUser={currentUser} component={<CreatePost />} />} />
        </Routes>
    );
};

const AppRouter = memo(AppRouterComponent);

export default AppRouter;
