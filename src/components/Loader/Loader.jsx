import styles from "./loader.module.scss";
import cn from "classnames";
import loaderTypes from "../../types/loaderTypes";

const loaderClassNameTypeMap = {
  [loaderTypes.grey]: styles.grey,
  [loaderTypes.disabled]: `${styles.small} ${styles.grey}`,
  [loaderTypes.small]: styles.small,
  [loaderTypes.medium]: styles.medium,
};

export default function Loader({ props, className, types }) {
  return (
    <div
      className={cn(styles.ldsRing, className, [
        types ? types.map((type) => loaderClassNameTypeMap[type]) : null,
      ])}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
