export function detectType(path: string) {
  if (path === "/") return "home";

 if (path.startsWith("/category") && path.split("/").length === 3)
  return "category";

if (path.startsWith("/category") && path.split("/").length > 3)
        return "article";
    
  if (path.startsWith("/article")) return "article";

  return "page";
}