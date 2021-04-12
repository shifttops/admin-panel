import styles from "./users-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { ArrowDownIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import AccessButton from "components/buttons/AccessButton";
import { useState } from "react";

export default function UsersPage(params) {
  const [isRoleSelect, setIsRoleSelect] = useState(false);

  const isRoleSelectClickHandler = () => {
    setIsRoleSelect((prevState) => !prevState);
  };

  const isRoleSelectBlurHandler = () => {
    setIsRoleSelect(false);
  };

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Users</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} className={styles.btnIcon} />
        </div>
        <div className={styles.button}>
          <Button text="Invate" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="username" />
            </th>
            <th className={styles.role}>role</th>
            <th>Access 1</th>
            <th>Access 2</th>
            <th>Access 3</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.name}>
              <Checkbox className={styles.checkbox} label="Wade Warren" />
            </td>
            <td
              className={styles.dropdown}
              onClick={isRoleSelectClickHandler}
              onBlur={isRoleSelectBlurHandler}
            >
              Manager <ArrowDownIcon />
              {isRoleSelect && (
                <div className={styles.wrap}>
                  <p className={styles.head}>Choose a role</p>
                  <div className={styles.item}>Marketing Coordinator</div>
                  <div className={styles.item}>Dog Trainer</div>
                  <div className={styles.item}>Web Designer</div>
                  <div className={styles.item}>Medical Assistant</div>
                  <div className={styles.itemButtons}>
                    <Button text="Apply" />
                    <Button text="Cancel" className={styles.btnBorder} />
                  </div>
                </div>
              )}
            </td>
            <td className={styles.icon}>
              <AccessButton />
            </td>
            <td className={styles.icon}>
              <AccessButton />
            </td>
            <td className={styles.icon}>
              <AccessButton />
            </td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
