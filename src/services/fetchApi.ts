const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://journal-backend-phi.vercel.app/news";

export async function fetchApi(url: string, options: RequestInit = {}) {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
