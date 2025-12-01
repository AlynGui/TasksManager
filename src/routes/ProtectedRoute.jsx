import useAuth from '../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

    const { user, loading, isInitialized } = useAuth();

    // Show loading while checking authentication status
    if (!isInitialized || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;  // Redirect to login if not authenticated

    return children; // Render the protected component
}
