import { useState } from "react";
import styles from "./URLShortenerWidget.module.scss";
import { toast } from "react-toastify";
import { showInfoToast } from "src/helpers/toastHelper";
import { UrlApi } from "src/api/urlShortenerApi/urlApi";

export const URLShortenerWidget = () => {
  const [urlToShorten, setUrlToShorten] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToShorten(event.target.value);
  };
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
  const handleShortenedUrlClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    showInfoToast("Copied to clipboard");
  };
  return (
    <form
      onSubmit={handleShortenButtonClick}
      className={styles.urlShortenerWidget}
    >
      <input
        value={urlToShorten}
        onChange={handleInputChange}
        className={styles.urlInput}
        type="text"
        placeholder="Paste your long URL here"
      />
      <button className={styles.shortenButton}>Shorten</button>

      {shortenedUrl && (
        <input
          onClick={handleShortenedUrlClick}
          className={styles.shortenedURLOutput}
          type="text"
          value={shortenedUrl}
          readOnly
        />
      )}
    </form>
  );
};
