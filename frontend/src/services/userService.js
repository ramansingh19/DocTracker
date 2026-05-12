import apiClient from "./apiClient";

export const fetchUsers = async (params = {}) => {
  const data = await apiClient.get("/users");
  const users = data.users || [];

  const filtered = params.role
    ? users.filter((user) => user.role === params.role)
    : users;

  return {
    data: filtered,
    total: filtered.length,
  };
};

export const deleteUser = async (userId) => {
  await apiClient.delete(`/users/${userId}`);
  return { success: true };
};

export default {
  fetchUsers,
  deleteUser,
};

