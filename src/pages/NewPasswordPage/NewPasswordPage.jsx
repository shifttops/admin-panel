import styles from "pages/NewPasswordPage/new-password-page.module.scss";
import InputLogin from "components/forms/InputLogin";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import logo from "images/logo.svg";

export default function NewPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <h1 className={styles.title}>Create new password</h1>
      <form className={styles.form}>
        <p className={styles.text}>
          Your new password must be defferent from previous used password
        </p>
        <InputPassword placeholder="Password" />
        <p className={styles.descr}>Must be at least 8 characters</p>
        <InputPassword placeholder="Confirm password" />
        <p className={styles.descr}>Both passwords must match</p>
        <Button text="Create new password" className={styles.btn} />
      </form>
    </div>
  );
}
