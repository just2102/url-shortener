import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UrlData } from "src/api/urlShortenerApi/types";
import { UrlApi } from "src/api/urlShortenerApi/urlApi";
import { showInfoToast } from "src/helpers/toastHelper";
import { AuthContext } from "./AuthContext";

type UrlContextType = {
  urls: UrlData[];
  setUrls: React.Dispatch<React.SetStateAction<UrlData[]>>;

  handleShortenButtonClick: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;

  urlToShorten: string;
  setUrlToShorten: React.Dispatch<React.SetStateAction<string>>;

  shortenedUrl: string;
  setShortenedUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const UrlContext = createContext<UrlContextType>({} as UrlContextType);

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized } = useContext(AuthContext);

  const [urls, setUrls] = useState<UrlData[]>([]);
  const [urlToShorten, setUrlToShorten] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleShortenButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!urlToShorten) {
      showInfoToast("Please enter a URL to shorten");
      return;
    }
    const response = await toast.promise(UrlApi.shortenUrl(urlToShorten), {
      pending: "Shortening URL...",
      success: "URL shortened successfully",
      error: "Failed to shorten URL",
    });

    setShortenedUrl(response.shortUrl);
  };

  useEffect(() => {
    const getUrls = async () => {
      if (!isAuthorized) return;
      const urls = await UrlApi.getUrls();
      setUrls(urls);
    };
    getUrls();
  }, [isAuthorized]);
  return (
    <UrlContext.Provider
      value={{
        urls,
        setUrls,
        handleShortenButtonClick,

        urlToShorten,
        setUrlToShorten,

        shortenedUrl,
        setShortenedUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};