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

const api1 =  "https://mistress-graduation-carriers-george.trycloudflare.com/news";
export async function updateStory(id: string, data: any) {
  const response = await fetch(`${api1}/news/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update story");
  }

  return response.json();
}