import { fetchApi } from "@/src/services/fetchApi";

export async function getNewsByCategory(category: string) {
  try {
    const res = await fetchApi(`/news/category/${category}`, {
      method: "GET",
    });

    return res;
  } catch (error) {
    console.error("News fetch failed:", error);
    return [];
  }
}

export async function getNewsById(id: string) {
  try {
    const res = await fetchApi(`/news/${id}`, {
      method: "GET",
    });
    console.log("req", res)
    return res;
  } catch (error) {
    console.error("Single news fetch failed:", error);
    return null;
  }
}

export async function searchNews(query: string) {
  try {
    const res = await fetchApi(`/news/search?q=${query}`, {
      method: "GET",
    });

    return res;
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}