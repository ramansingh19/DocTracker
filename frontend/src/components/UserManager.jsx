import React, { useCallback, useEffect, useState } from 'react';
import userService from '../services/userService';
import authService, { getStoredUser } from '../services/authService';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [showManager, setShowManager] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUser = getStoredUser();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await userService.fetchUsers({ limit: 50 });
      setUsers(result.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      if (err.status === 401) {
        authService.clearSession();
      }
      setUsers(currentUser ? [currentUser] : []);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (showManager) {
      loadUsers();
    }
  }, [showManager, loadUsers]);

  const removeUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      await loadUsers();
    } catch (err) {
      setError(err.message || 'Unable to delete user');
    }
  };

  if (!showManager) {
    return (
      <button 
        className="fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-0 text-white text-2xl cursor-pointer shadow-[0_4px_15px_rgba(102,126,234,0.3)] transition-all duration-300 z-[1000] hover:scale-110 hover:shadow-[0_6px_20px_rgba(102,126,234,0.4)]"
        onClick={() => setShowManager(true)}
        title="Show User Manager"
      >
        👥
      </button>
    );
  }

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="fixed bottom-5 right-5 w-[400px] max-h-[600px] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-black/5 z-[1000] overflow-hidden md:w-[calc(100vw-2rem)] md:max-w-[400px] md:right-4 md:bottom-4">
      <div className="flex justify-between items-center p-6 bg-gradient-to-br from-slate-50 to-slate-200 border-b border-gray-200">
        <h3 className="m-0 text-lg font-semibold text-gray-900">User Manager</h3>
        <button 
          className="bg-transparent border-0 text-xl text-slate-500 cursor-pointer p-1 rounded transition-all duration-300 hover:bg-black/5 hover:text-gray-700"
          onClick={() => setShowManager(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="p-6 max-h-[500px] overflow-y-auto md:max-h-[calc(100vh-8rem)]">
        <div className="flex gap-4 mb-6 md:flex-col md:gap-3">
          <div className="flex-1 text-center p-4 bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl border border-gray-200">
            <span className="block text-2xl font-bold text-gray-900 mb-1">{users.length}</span>
            <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Total Users</span>
          </div>
          <div className="flex-1 text-center p-4 bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl border border-gray-200">
            <span className="block text-2xl font-bold text-gray-900 mb-1">{users.filter(u => u.role === 'doctor').length}</span>
            <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Doctors</span>
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">{error}</div>}

        {loading ? (
          <div className="text-center py-6 text-slate-500 text-sm">Loading users...</div>
        ) : (
        <div className="mb-6">
          {users.map((user, index) => (
            <div key={user._id || index} className="flex justify-between items-center p-4 mb-3 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="text-2xl w-10 h-10 flex items-center justify-center bg-white/50 rounded-full">
                  {user.role === 'doctor' ? '👨‍⚕️' : user.role === 'admin' ? '👨‍💼' : '👤'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">{user.name}</div>
                  <div className="text-xs text-slate-500 mb-0.5 font-mono">{user.email}</div>
                  <div className="text-xs text-gray-700 font-medium uppercase tracking-wider">{user.role}</div>
                </div>
              </div>
              <div>
                {isAdmin && currentUser?.email !== user.email ? (
                  <button 
                    className="bg-red-500 text-white border-0 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5"
                    onClick={() => removeUser(user._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-white/50 text-amber-800 rounded-full text-xs font-semibold">{user.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {!isAdmin && (
          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="text-sm text-slate-600 bg-blue-100 border border-blue-300 p-3 rounded-lg">Admin access required for full user management.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;
