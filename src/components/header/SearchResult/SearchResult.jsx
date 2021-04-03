import styles from "./search-result.module.scss";

export default function SearchResult() {
  return (
    <div className={styles.searchResult}>
      <div className={styles.searchResult__item}>
        <p className={styles.searchResult__id}>Store ID: 20209 </p>
        <p className={styles.searchResult__info}>
          Region: <span>München</span>
        </p>
        <p className={styles.searchResult__info}>
          Location: <span>Maria-Probst-Straße 1</span>
        </p>
        <p className={styles.searchResult__info}>
          Store type: <span>Franchise</span>
        </p>
      </div>
      <div className={styles.searchResult__item}>
        <p className={styles.searchResult__id}>Store ID: 20209 </p>
        <p className={styles.searchResult__info}>
          Region: <span>München</span>
        </p>
        <p className={styles.searchResult__info}>
          Location: <span>Maria-Probst-Straße 1</span>
        </p>
        <p className={styles.searchResult__info}>
          Store type: <span>Franchise</span>
        </p>
      </div>
      <div className={styles.searchResult__item}>
        <p className={styles.searchResult__id}>Store ID: 20209 </p>
        <p className={styles.searchResult__info}>
          Region: <span>München</span>
        </p>
        <p className={styles.searchResult__info}>
          Location: <span>Maria-Probst-Straße 1</span>
        </p>
        <p className={styles.searchResult__info}>
          Store type: <span>Franchise</span>
        </p>
      </div>
    </div>
  );
}
