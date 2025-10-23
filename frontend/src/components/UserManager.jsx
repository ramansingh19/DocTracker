import React, { useEffect, useState } from 'react';
import './UserManager.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const mockUsers = [
      { email: 'doctor@example.com', password: 'password123', role: 'doctor', name: 'Dr. Smith', isMock: true },
      { email: 'admin@example.com', password: 'password123', role: 'admin', name: 'Admin User', isMock: true },
      { email: 'patient@example.com', password: 'password123', role: 'patient', name: 'Patient User', isMock: true }
    ];
    setUsers([...mockUsers, ...registeredUsers]);
  };

  const clearAllUsers = () => {
    localStorage.removeItem('registeredUsers');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    loadUsers();
  };

  const deleteUser = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = registeredUsers.filter(user => user.email !== email);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    loadUsers();
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
            <span className="stat-number">{users.filter(u => !u.isMock).length}</span>
            <span className="stat-label">Registered</span>
          </div>
        </div>

        <div className="user-list">
          {users.map((user, index) => (
            <div key={index} className={`user-item ${user.isMock ? 'mock-user' : 'registered-user'}`}>
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
                {user.isMock ? (
                  <span className="mock-badge">Demo</span>
                ) : (
                  <button 
                    className="delete-btn"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="user-manager-actions">
          <button 
            className="clear-all-btn"
            onClick={clearAllUsers}
          >
            Clear All Registered Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
