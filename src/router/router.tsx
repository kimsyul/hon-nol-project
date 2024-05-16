import { Routes, Route } from 'react-router-dom';
import { memo } from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Write from '../pages/Write';
import Regions from '../pages/Regions';
import SignUp from '../pages/SignUp';
import ThemeCategory from '../pages/ThemeCategory';

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/write" element={<Write />} />
      <Route path="/regions" element={<Regions />} />
      <Route path="/theme" element={<ThemeCategory />} />
    </Routes>
  );
};

export default memo(Router);
