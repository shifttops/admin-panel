import styles from "./loader.module.scss";
import cn from "classnames";

export default function Loader({ props, className }) {
  return (
    <div className={cn(styles.ldsRing, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
