const USERS_STORAGE_KEY = 'doctracker_users';

// Get all registered users from localStorage
function getAllUsers() {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

// Save all users to localStorage
function saveAllUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export const fetchUsers = (params = {}) => {
  return new Promise((resolve) => {
    const users = getAllUsers();
    // Remove password from user objects
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    // Simple filtering/sorting if needed
    let result = usersWithoutPasswords;
    
    if (params.role) {
      result = result.filter(u => u.role === params.role);
    }
    
    resolve({
      data: result,
      total: result.length
    });
  });
};

export const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const users = getAllUsers();
      const filteredUsers = users.filter(u => u.id !== userId && u.email !== userId);
      
      if (filteredUsers.length === users.length) {
        reject(new Error('User not found'));
        return;
      }
      
      saveAllUsers(filteredUsers);
      resolve({ success: true });
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  fetchUsers,
  deleteUser,
};

