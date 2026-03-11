import { fetchApi } from "./fetchApi";

/* GET USERS */

export const getUsers = async () => {
  return fetchApi(`/users`, {
    method: "GET",
  });
};

/* CREATE USER */

export const createUser = async (data: any) => {
  return fetchApi(`/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/* DELETE USER */

export const deleteUserApi = async (id: string) => {
  return fetchApi(`/users/${id}`, {
    method: "DELETE",
  });
};

/* UPDATE USER */

export const updateUserApi = async (id: string, data: any) => {
  return fetchApi(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};