import styles from "./forgot-password-page.module.scss";
import InputLogin from "components/forms/InputLogin";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import { NavLink } from "react-router-dom";
import logo from "images/logo.svg";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <h1 className={styles.title}>Forgot your password?</h1>
      <form className={styles.form}>
        <p className={styles.text}>
          We have sent a password recover instruction to your email
        </p>
        <InputLogin placeholder="Your email" />
        <Button text="Sign in" className={styles.btn} />
      </form>
    </div>
  );
}
