export function routerUrlModelIdFromPath(url: string): string | null {
  const path = url.split("?")[0].split("#")[0];
  const segs = path.split("/").filter(Boolean);
  const i = segs.indexOf("model");
  if (i < 0) return null;
  const id = segs[i + 1];
  if (!id || id === "new") return null;
  return id;
}

export function routerUrlIsModelWorkspace(url: string): boolean {
  return routerUrlModelIdFromPath(url) != null;
}
