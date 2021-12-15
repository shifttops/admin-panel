import styles from "./users-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { ArrowDownIcon, DeclineIcon, MoreIcon, SortIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import AccessButton from "components/buttons/AccessButton";
import { useEffect, useState } from "react";
import { refreshToken } from "../../helpers/AuthHelper";

export default function UsersPage(params) {
  const [isRoleSelect, setIsRoleSelect] = useState(false);
  const [users, setUsers] = useState([]);

  const isRoleSelectClickHandler = () => {
    setIsRoleSelect((prevState) => !prevState);
  };

  const isRoleSelectBlurHandler = () => {
    setIsRoleSelect(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        await refreshToken();

        const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/get_users`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
        );
        const res = await resp.json();
        console.log(res.filter(item => item.user_permissions?.length))

        setUsers(res);

      } catch (e) {
        console.log(e.message);
      }
    };

    const getPermissions = async () => {
      try {
        await refreshToken();

        const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/get_set_permissions`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
        );
        const res = await resp.json();
        

      } catch (e) {
        console.log(e.message);
      }
    };


    getUsers();
    getPermissions();
  }, [])

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
          {users.map(user => (
            <tr className={styles.name} key={user.username}>
              <td className={styles.name}>
              <Checkbox className={styles.checkbox} label={user.username} />
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
              <DeclineIcon />
            </td>
            <td className={styles.icon}>
              <AccessButton />
            </td>
            <td>
              <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
            </td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
}
