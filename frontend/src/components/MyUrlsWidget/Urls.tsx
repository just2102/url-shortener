import { UrlData } from "src/api/urlShortenerApi/types";

interface UrlsProps {
  urls: UrlData[];
}
export const Urls = ({ urls }: UrlsProps) => {
  return (
    <ul>
      {urls.map((url, index) => {
        return (
          <li key={index}>
            <a href={import.meta.env.VITE_BACKEND_URL + "/" + url.shortLink}>
              {url.shortLink}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
