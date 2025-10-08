
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../layout/Spinner';

const ProtectedRoute = ({ role, redirectPath = "/" }) => {
    const { user, userType, loading } = useAuth();
    if (loading) return <Spinner />;
    if (user && userType === role) return <Outlet />;

    return <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
