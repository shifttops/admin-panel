import React from "react";
import styles from "./button.module.scss";
import cn from "classnames";

const Button = React.forwardRef( ({text, disabled, className, Icon = () => null, onClick, type='button'}, ref) => (
    <button
      className={cn(styles.btn, styles[className])}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <Icon />
      {text}
    </button>
  )
)

export default Button;
