import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "./login-page.module.scss";
import InputLogin from "components/forms/InputLogin";
import InputPassword from "components/forms/InputPassword";
import Button from "components/buttons/Button";
import { NavLink } from "react-router-dom";
import logo from "images/logo.svg";

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [cookies, setCookie] = useCookies(['token'])
  const history = useHistory();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('https://mcd.avaich.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: login, password })
      });
      const res = await resp.json();
      if (!res.error && !!res.access_token) {
        setCookie('token', res.access_token, { path: '/' });
        history.push("/home");
      } else {
        setError(true);
      }
    }
    catch (e) {
      console.log(e);
      setError(true);
    }
  }
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} />
      <h1 className={styles.title}>Welcome back</h1>
      <form className={styles.form}>
        {error && <p className={styles.errorText}>Please enter a valid email address</p>}
        <InputLogin placeholder="Login" value={login} setValue={setLogin} />
        <InputPassword placeholder="Password" value={password} setValue={setPassword} />
        <NavLink className={styles.link} to="/">
          Forgot your password?
        </NavLink>
        <Button text="Sign in" className={styles.btn} onClick={handleLogIn} type='submit' />
      </form>
    </div>
  );
}
