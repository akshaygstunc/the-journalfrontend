import { api } from "./axios";

export const createStory = async (data: any) => {
  const res = await api.post("/stories", data);
  return res.data;
};