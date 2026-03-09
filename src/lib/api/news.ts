import { api } from "@/src/services/axios";

export async function getNewsByCategory(category: string) {

  try {

    const res = await api.get(`/news/category/${category}`);

    return res.data;

  } catch (error) {

    console.error("News fetch failed:", error);

    return [];

  }

}
export async function getNewsById(id: string) {

  try {

    const res = await api.get(`/news/${id}`);

    return res.data;

  } catch (error) {

    console.error("Single news fetch failed:", error);

    return null;

  }

}
export async function searchNews(query: string) {

  try {

    const res = await api.get(`/news/search?q=${query}`);

    return res.data;

  } catch (error) {

    console.error("Search failed:", error);

    return [];

  }

}