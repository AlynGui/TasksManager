import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import { toast } from 'react-toastify';
import warningIcon from '../assets/warning.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, loading } = useAuth();
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    // Redirect to home if already logged in
    useEffect(() => {
        if (user) navigate('/');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        try {
            await login(email, password);
            setEmail('');
            setPassword('');
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            setLocalError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text mb-2">
                        Tasks Manager
                    </h1>
                    <p className="text-slate-600">Welcome back! Please sign in to your account</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Sign In</h2>
                    {/* Error Message */}
                    {(localError) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            <div className="flex items-center">
                                <img src={warningIcon} alt="Warning" className="w-4 h-4 mr-2" />
                                {localError}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                required
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/50"
                            />
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                required
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/50"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-sky-700 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Links Section */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <div className="space-y-3 text-center">
                            <div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sky-600 hover:text-sky-700 text-sm font-medium transition duration-200 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="text-slate-600 text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-sky-600 hover:text-sky-700 font-medium transition duration-200 hover:underline"
                                >
                                    Create account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>© 2025 Tasks Manager. </p>
                </div>
            </div>
        </div>
    );
}
