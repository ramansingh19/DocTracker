import apiClient from './apiClient';

export const fetchUsers = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const path = query ? `/users?${query}` : '/users';
  return apiClient.get(path);
};

export const deleteUser = (userId) => apiClient.delete(`/users/${userId}`);

export default {
  fetchUsers,
  deleteUser,
};

