import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';

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

export default AuthRedirect;
