import { fetchApi } from "./fetchApi";

export const getCoverage = async (status: string) => {
  return fetchApi(`/news/coverage?status=${status}`, {
    method: "GET",
  });
};

export const assignStory = async (
  id: string,
  reporter: string,
  priority: string
) => {
  return fetchApi(`/news/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify({
      reporter,
      priority,
    }),
  });
};

export const ignoreStory = async (id: string) => {
  return fetchApi(`/news/${id}/ignore`, {
    method: "PATCH",
  });
};

export const createStory = async (data: any) => {
  return fetchApi(`/news/manual`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const saveDraft = async (data: any) => {
  return fetchApi(`/news/manual`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateStatus = async (id: string, status: string) => {
  return fetchApi(`/news/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};