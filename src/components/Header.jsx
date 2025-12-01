import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import userIcon from '../assets/user.svg';
import useAuth from '../hooks/useAuth.jsx';
import { toast } from 'react-toastify';
import { validatePassword } from '../utils/validate.jsx';

// Header component with user dropdown and reset password modal
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const { logout, forgotPassword, loading, user } = useAuth();
  const navigate = useNavigate();
  // Ref for dropdown container
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  // Handle reset password
  const handleResetPassword = () => {
    setIsDropdownOpen(false);
    setIsResetPasswordOpen(true);
    setNewPassword('');
    setConfirmNewPassword('');
    setResetError('');
  };

  // Handle reset password form submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError('');

    if (!user?.email) {
      setResetError('User email not found');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetError('Passwords do not match!');
      return;
    }

    const validationErrors = validatePassword(newPassword);
    if (validationErrors) {
      setResetError(validationErrors);
      return;
    }

    try {
      await forgotPassword(user.email, newPassword);
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success('Password reset successful!');
    } catch (error) {
      setResetError(error.message);
    }
  };

  // Close reset password modal
  const closeResetModal = () => {
    setIsResetPasswordOpen(false);
    setNewPassword('');
    setConfirmNewPassword('');
    setResetError('');
  };

  return (
    <header className="bg-white text-slate-800 p-4 shadow-sm border-b border-slate-200">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to='/' className="text-2xl font-bold hover:text-sky-600 transition">Tasks Manager</Link>
        <div ref={dropdownRef} className="relative">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsDropdownOpen((open) => !open)}>
            <img
              src={userIcon}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-slate-200 hover:border-sky-300 transition-colors"
            />
            <div className="text-right">
              <p className="text-sm text-slate-600 font-medium">Hello,</p>
              <p className="text-lg font-semibold text-slate-800">{user?.username || 'User'}</p>
            </div>
          </div>
          {/* User Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-white border border-slate-200 rounded-lg shadow-md p-4 space-y-2 z-50">
              <button
                type="button"
                className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer whitespace-nowrap"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Reset Password Modal */}
        {isResetPasswordOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
                <button
                  onClick={closeResetModal}
                  className="text-slate-400 hover:text-slate-600 text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Reset Password Form */}
              <form onSubmit={handleResetSubmit} className="space-y-4">
                {resetError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {resetError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email:</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Password:</label>
                  <input
                    required
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password:</label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeResetModal}
                    className="flex-1 py-2 px-4 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 
