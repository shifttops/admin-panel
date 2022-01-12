import styles from "./input-password.module.scss";
import { useState } from "react";
import cn from "classnames";

export default function InputPassword({ placeholder, value, setValue }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type={!isPasswordVisible ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        onMouseEnter={() => setIsPasswordVisible(true)}
        onMouseLeave={() => setIsPasswordVisible(false)}
        className={cn(styles.passwordControl, {
          [styles.passwordControl__visible]: isPasswordVisible,
        })}
      />
    </div>
  );
}
