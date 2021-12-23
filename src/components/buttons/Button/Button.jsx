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
      onClick,
      type = "button",
      fetching,
      loaderClassName,
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
        <>
          <Icon /> {text}
        </>
      ) : (
        <Loader className={loaderClassName} />
      )}
    </button>
  )
);

export default Button;
