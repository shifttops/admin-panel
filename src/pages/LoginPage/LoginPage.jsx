import styles from "./login-page.module.scss";
import InputLogin from "components/forms/InputLogin";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import { NavLink } from "react-router-dom";
import logo from "images/logo.svg";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <h1 className={styles.title}>Welcome back</h1>
      <form className={styles.form}>
        <p className={styles.errorText}>Please enter a valid email address</p>
        <InputLogin placeholder="Login" />
        <InputPassword placeholder="Password" />
        <NavLink className={styles.link} to="/">
          Forgot your password?
        </NavLink>
        <Button text="Sign in" className={styles.btn} />
      </form>
    </div>
  );
}
