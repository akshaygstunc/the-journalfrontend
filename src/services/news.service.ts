import { api } from "./axios";

 
export const getCoverage = async (status: string) => {
  const res = await api.get(`/news/coverage?status=${status}`);
  return res.data;
};
 
export const assignStory = async (
  id: string,
  reporter: string,
  priority: string
) => {
  const res = await api.patch(`/news/${id}/assign`, {
    reporter,
    priority,
  });
 
  return res.data;
};
 
export const ignoreStory = async (id: string) => {
  const res = await api.patch(`/news/${id}/ignore`);
  return res.data;
};


/* CREATE MANUAL STORY */

export const createStory = async (data: any) => {
  const res = await api.post("/news/manual", data);
  return res.data;
};

/* SAVE DRAFT */

export const saveDraft = async (data: any) => {
  const res = await api.post("/news/manual", data);
  return res.data;
};

export const updateStatus = async (
  id: string,
  status: string
) => {

  const res = await api.patch(`/news/${id}/status`, {
    status
  });

  return res.data;

};