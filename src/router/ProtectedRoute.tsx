import { Navigate, Outlet } from 'react-router';

import useAuth from '../hooks/useAuth';
import { Loader } from '../components';


const ProtectedRoute = () => {
    const { isLoading, user } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/authorize" />;
    }

    return <Outlet context={{ user }} />;
};

export default ProtectedRoute;