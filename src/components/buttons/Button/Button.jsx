import React from "react";
import styles from "./button.module.scss";
import cn from "classnames";
import Loader from "../../Loader";

const Button = React.forwardRef(
  (
    {
      text,
      disabled,
      className,
      Icon = () => null,
      onClick = () => null,
      type = "button",
      fetching,
      iconProps = {},
    },
    ref
  ) => (
    <button
      className={cn(styles.btn, styles[className])}
      disabled={fetching ? true : disabled}
      onClick={onClick}
      type={type}
    >
      {!fetching ? (
        <span>
          <Icon {...iconProps} /> {text}
        </span>
      ) : (
        <Loader types={["disabled"]} />
      )}
    </button>
  )
);

export default Button;
