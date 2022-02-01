import cn from "classnames";
import styles from "./user-account.module.scss";
import noImage from "../../images/accountIcon.svg";

const UserAccount = ({
  image = noImage,
  accountName = "User name",
  className,
}) => {
  return (
    <div className={styles.user}>
      <img src={image} alt="user avatar" />
      <span className={cn(styles.name, className)}>{accountName}</span>
    </div>
  );
};

export default UserAccount;
