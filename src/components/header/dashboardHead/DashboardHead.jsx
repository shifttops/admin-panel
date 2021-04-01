import { FavoriteIcon, PrintIcon } from "../../../icons/icons";
import ButtonIcon from "../../buttons/ButtonIcon/ButtonIcon";
import SearchQuick from "../../search/SearchQuick";
import styles from "./DashboardHead.module.scss";

export default function DashboardHead(params) {
  return (
    <div className={styles.dashboardHead}>
      <div className={styles.dashboardHead__searchWrapper}>
        <p className={styles.dashboardHead__title}>Store list</p>
        <SearchQuick />
        <div className={styles.dashboardHead__favorite}>
          <ButtonIcon Icon={FavoriteIcon} />
        </div>
      </div>
      <div className={styles.dashboardHead__buttons}>
        <div className={styles.dashboardHead__print}>
          <ButtonIcon Icon={PrintIcon} />
        </div>
        <button className={styles.dashboardHead__report}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.17969 2.82031C6.91406 2.82031 5.88281 2 4.3125 2C3.72656 2 3.21094 2.11719 2.71875 2.30469C2.76562 2.14062 2.78906 2 2.78906 1.83594C2.78906 1.78906 2.78906 1.76562 2.78906 1.74219C2.76562 1.08594 2.20312 0.546875 1.54688 0.523438C0.796875 0.476562 0.1875 1.08594 0.1875 1.8125C0.1875 2.28125 0.398438 2.65625 0.75 2.89062V11.9375C0.75 12.2656 0.984375 12.5 1.3125 12.5H1.6875C1.99219 12.5 2.25 12.2656 2.25 11.9375V9.73438C2.90625 9.45312 3.72656 9.21875 4.92188 9.21875C6.1875 9.21875 7.21875 10.0391 8.78906 10.0391C9.91406 10.0391 10.8281 9.64062 11.6719 9.07812C11.8594 8.9375 12 8.70312 12 8.46875V2.75C12 2.21094 11.4141 1.85938 10.9219 2.07031C10.125 2.44531 9.14062 2.82031 8.17969 2.82031Z"
              fill="#F9F9F9"
            />
          </svg>
          Report
        </button>
      </div>
    </div>
  );
}
