import { useEffect, useRef, useState } from "react";
import styles from "./select.module.scss";
import { ArrowDownIcon } from "../../icons";
import cn from "classnames";
import Loader from "../Loader";

const Select = ({
  value,
  values,
  mapper,
  setValues,
  field,
  onClick,
  isError = null,
  isFetching = false,
}) => {
  const ref = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current.contains(e.target)) setIsVisible(false);
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleChoose = (item) => {
    if (values && setValues) {
      const newVal = { ...values };
      newVal[field] = item.name;
      setValues(newVal);
    }
    if (onClick) onClick(item);
  };

  return !isFetching ? (
    <div className={styles.select}>
      <div
        ref={ref}
        className={cn(styles.select__input, {
          [styles.select__input__error]: isError,
        })}
        onClick={() => setIsVisible((prevState) => !prevState)}
      >
        <p>
          {value
            ? mapper.find((item) => item.name === value)
              ? mapper.find((item) => item.name === value).visibleName
              : value
            : null}
        </p>
        <span className={styles.icon}>
          <ArrowDownIcon isOpen={isVisible} />
        </span>
        <div
          className={cn(styles.dropdown, {
            [styles.dropdown__visible]: isVisible,
          })}
        >
          {mapper
            ? mapper.map((item) => (
                <div
                  key={item.name}
                  className={cn(styles.dropdown__item, {
                    [styles.dropdown__item__chosen]:
                      value && value === item.name,
                  })}
                  onClick={() => handleChoose(item)}
                >
                  {item.visibleName}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.loader}>
      <Loader types={["small"]} />
    </div>
  );
};

export default Select;
