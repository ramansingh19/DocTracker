import React, { useCallback, useEffect, useState } from 'react';
import './UserManager.css';
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
        className="user-manager-toggle"
        onClick={() => setShowManager(true)}
        title="Show User Manager"
      >
        👥
      </button>
    );
  }

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="user-manager">
      <div className="user-manager-header">
        <h3>User Manager</h3>
        <button 
          className="close-btn"
          onClick={() => setShowManager(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="user-manager-content">
        <div className="user-stats">
          <div className="stat">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat">
            <span className="stat-number">{users.filter(u => u.role === 'doctor').length}</span>
            <span className="stat-label">Doctors</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
        <div className="user-list">
          {users.map((user, index) => (
            <div key={user._id || index} className="user-item registered-user">
              <div className="user-info">
                <div className="user-avatar">
                  {user.role === 'doctor' ? '👨‍⚕️' : user.role === 'admin' ? '👨‍💼' : '👤'}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>
              <div className="user-actions">
                {isAdmin && currentUser?.email !== user.email ? (
                  <button 
                    className="delete-btn"
                    onClick={() => removeUser(user._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <span className="mock-badge">{user.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {!isAdmin && (
          <div className="user-manager-actions">
            <p className="info-message">Admin access required for full user management.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;
