import styles from "./search-quick.module.scss";

export default function SearchQuick({setSearch, placeholderText = "Быстрый поиск"}) {
  return (
    <div className={styles.dashboardSearch}>
      <input className={styles.search} onChange={(e) => setSearch && setSearch(e.target.value)} type="text" placeholder={placeholderText} />
    </div>
  );
}
