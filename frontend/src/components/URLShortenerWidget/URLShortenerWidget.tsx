import { useContext } from "react";
import styles from "./URLShortenerWidget.module.scss";
import { showInfoToast } from "src/helpers/toastHelper";
import { UrlContext } from "src/context/UrlContext";

export const URLShortenerWidget = () => {
  const {
    handleShortenButtonClick,
    urlToShorten,
    shortenedUrl,
    setUrlToShorten,
  } = useContext(UrlContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToShorten(event.target.value);
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
