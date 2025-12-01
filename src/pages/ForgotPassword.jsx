import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import { toast } from 'react-toastify';
import warningIcon from '../assets/warning.svg';
import { validateEmailAndPassword } from '../utils/validate.jsx';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [localError, setLocalError] = useState(null);
    const { forgotPassword, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (newPassword !== confirmNewPassword) {
            setLocalError('Passwords do not match!');
            return;
        }

        const validationErrors = validateEmailAndPassword({ email, password: newPassword });
        if (validationErrors.email || validationErrors.password) {
            setLocalError(Object.values(validationErrors).filter(Boolean).join("\n"));
            return;
        }

        try {
            await forgotPassword(email, newPassword);
            setEmail('');
            setNewPassword('');
            setConfirmNewPassword('');
            toast.success('Password reset successful! Please log in with your new password.');
            navigate('/login');
        } catch (err) {
            setLocalError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text mb-2">
                        Tasks Manager
                    </h1>
                    <p className="text-slate-600">Reset your password to regain access</p>
                </div>

                {/* Reset Password Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Reset Password</h2>
                    {/* Error Message */}
                    {(localError) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            <div className="flex items-start">
                                <img src={warningIcon} alt="Warning" className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <div className="whitespace-pre-line">{localError}</div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                required
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/50"
                            />
                        </div>
                        {/* New Password Field */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                                New Password
                            </label>
                            <input
                                required
                                id="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/50"
                            />
                        </div>
                        {/* Confirm New Password Field */}
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                required
                                id="confirmNewPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200 bg-white/50"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-sky-700 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    Resetting password...
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>

                    {/* Links Section */}
                    <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                        <div className="text-slate-600 text-sm">
                            Remember your password?{' '}
                            <Link
                                to="/login"
                                className="text-sky-600 hover:text-sky-700 font-medium transition duration-200 hover:underline"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>© 2025 Tasks Manager.</p>
                </div>
            </div>
        </div>
    );
}
