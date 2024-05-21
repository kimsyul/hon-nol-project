import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Regions from '../pages/Regions';
import SignUp from '../pages/SignUp';
import ThemeCategory from '../pages/ThemeCategory';
import { memo } from 'react';

const Router = (): JSX.Element => {
    return (
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/theme" element={<ThemeCategory />} />
        </Routes>
    );
};

export default memo(Router);
