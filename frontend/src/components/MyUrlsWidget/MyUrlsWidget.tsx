import { useContext } from "react";
import styles from "./MyUrlsWidget.module.scss";
import { Urls } from "./Urls";
import { UrlContext } from "src/context/UrlContext";

export const MyUrlsWidget = () => {
  const { urls } = useContext(UrlContext);

  if (!urls?.length) return null;
  return (
    <div className={styles.myUrlsWidget}>
      <h2>My URLs</h2>
      <Urls urls={urls} />
    </div>
  );
};
