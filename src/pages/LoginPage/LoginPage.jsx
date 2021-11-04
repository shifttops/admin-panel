import { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import styles from "./login-page.module.scss";
import InputLogin from "components/forms/InputLogin";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import logo from "images/logo.svg";
import routes from "../../constants/routes";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const checkStorage = () => {
    return (
      localStorage.getItem("access") &&
      localStorage.getItem("access") !== "undefined" &&
      +localStorage.getItem("date") > +new Date()
    );
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${process.env.REACT_APP_URL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: login, password }),
      });
      const res = await resp.json();
      if (!res.error && !!res.access) {
        localStorage.setItem("access", res.access);
        localStorage.setItem("refresh", res.refresh);
        localStorage.setItem(
          "date",
          +new Date() + res.expires_in * 1000 - 1000
        );
        localStorage.setItem(
          "refresh_date",
          +new Date() + res.refresh_life_time * 1000 - 1000
        );
        localStorage.setItem("userName", res.userName);
        history.push(routes.home);
      } else {
        setError(true);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("date");
        localStorage.removeItem("refresh_date");
        localStorage.removeItem("userName");
      }
    } catch (e) {
      console.log(e);
      setError(true);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("date");
      localStorage.removeItem("refresh_date");
      localStorage.removeItem("userName");
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <h1 className={styles.title}>Welcome back</h1>
      <form className={styles.form}>
        {error && (
          <p className={styles.errorText}>Please enter a valid email address</p>
        )}
        <InputLogin placeholder="Login" value={login} setValue={setLogin} />
        <InputPassword
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <NavLink className={styles.link} to="/">
          Forgot your password?
        </NavLink>
        <Button
          text="Sign in"
          className={styles.btn}
          onClick={handleLogIn}
          type="submit"
        />
      </form>
      {checkStorage() && <Redirect to={routes.home} />}
    </div>
  );
}
