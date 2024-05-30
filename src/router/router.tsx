import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';
import RegionDetail from '../pages/RegionDetail';
import ThemeDetail from '../pages/ThemeDetail';
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CreatePost from '../pages/CreatePost';
import { memo } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import AuthRedirect from './AuthRedirect';
import ProtectedRoute from './ProtectedRoute';
import PostDetail from '../pages/PostDetail';

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
            <Route path="/" element={<Home />} />
            <Route path="/regions" element={<PostList />} />
            <Route path="/themes" element={<PostList />} />
            <Route path="/posts/:postID" element={<PostDetail />} />
            <Route path="/login" element={<AuthRedirect currentUser={currentUser} component={<Login />} />} />
            <Route path="/sign-up" element={<AuthRedirect currentUser={currentUser} component={<SignUp />} />} />
            <Route path="/post" element={<ProtectedRoute currentUser={currentUser} component={<CreatePost />} />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

const AppRouter = memo(AppRouterComponent);

export default AppRouter;
