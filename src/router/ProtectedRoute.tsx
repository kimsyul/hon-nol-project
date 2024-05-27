import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
    currentUser: User | null;
    component: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ currentUser, component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    return currentUser ? component : null;
};

export default ProtectedRoute;
