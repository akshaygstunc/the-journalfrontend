import { fetchApi } from "./fetchApi";

export const createStory = async (data: any) => {
  return fetchApi(`/stories`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};