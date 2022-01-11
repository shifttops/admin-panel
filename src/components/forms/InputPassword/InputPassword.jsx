import styles from "components/forms/InputPassword/input-password.module.scss";
import ButtonIcon from "../../buttons/ButtonIcon";
import { useState } from "react";
import Button from "../../buttons/Button";
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
        onClick={() => setIsPasswordVisible((prevState) => !prevState)}
        className={cn(styles.passwordControl, {
          [styles.passwordControl__visible]: isPasswordVisible,
        })}
      />
    </div>
  );
}
