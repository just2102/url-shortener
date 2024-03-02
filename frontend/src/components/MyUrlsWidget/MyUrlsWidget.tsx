import { useEffect, useState } from "react";
import styles from "./MyUrlsWidget.module.scss";
import { Urls } from "./Urls";
import { UrlData } from "src/api/urlShortenerApi/types";
import { UrlApi } from "src/api/urlShortenerApi/urlApi";

export const MyUrlsWidget = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await UrlApi.getUrls();
      setUrls(urls);
    };
    fetchUrls();
  }, []);
  return (
    <div className={styles.myUrlsWidget}>
      <h2>My URLs</h2>
      <Urls urls={urls} />
    </div>
  );
};
