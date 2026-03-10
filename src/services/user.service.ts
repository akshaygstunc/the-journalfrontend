
/* GET USERS */

import { api } from "./axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

/* CREATE USER */

export const createUser = async (data:any) => {
  const res = await api.post("/users", data);
  return res.data;
};

/* DELETE USER */

export const deleteUserApi = async (id:string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

/* UPDATE USER */

export const updateUserApi = async (id:string, data:any) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};