import { Link, useHistory } from "react-router-dom";
import cn from "classnames";
import styles from "./back-link.module.scss";

const BackLink = ({ text, path, className }) => {
  return (
    <Link className={cn(styles.link, className)} to={path}>
      <span>{text}</span>
    </Link>
  );
};

export default BackLink;
