import styles from "./email-send-page.module.scss";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import logo from "images/logo.svg";

export default function EmailSendPage() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <div className={styles.inner}>
        <h1 className={styles.title}>Email has been sent!</h1>
        <p className={styles.text}>
          Please check your inbox and click in the recieved link to reset a
          password
        </p>
        <Button text="Login" className={styles.btn} />
      </div>
    </div>
  );
}
