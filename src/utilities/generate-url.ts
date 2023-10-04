export default function generateUrl(url: string) {
  if (url.match(/^(http:\/\/|https:\/\/)/)) {
    return url;
  }
  return `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3333"}${url}`;
}
