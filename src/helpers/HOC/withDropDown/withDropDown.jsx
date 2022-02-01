import { useEffect, useState } from "react";
import styles from "./with-dropdown.module.scss";
import { ArrowDownIcon } from "../../../icons";
import cn from "classnames";

const withDropDown = ({ Component, title, opened = false, ...props }) => {
  const Comp = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(opened);

    useEffect(() => {
      setIsDropdownVisible(opened);
    }, [opened]);

    return (
      <>
        <div
          className={styles.title}
          onClick={() => setIsDropdownVisible((prevState) => !prevState)}
        >
          {title}
          <span>
            <ArrowDownIcon
              isOpen={isDropdownVisible}
              color={"rgba(51, 51, 51, 0.5)"}
            />
          </span>
        </div>
        <div
          className={cn(styles.body, {
            [styles.body__visible]: isDropdownVisible,
          })}
        >
          <Component {...props} />
        </div>
      </>
    );
  };

  return <Comp />;
};

export default withDropDown;
