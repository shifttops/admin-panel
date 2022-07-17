import styles from "./users-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { ArrowDownIcon, DeclineIcon, MoreIcon, SortIcon } from "icons";
import Button from "../../components/buttons/Button";
import Checkbox from "../../components/Checkbox";
import AccessButton from "../../components/buttons/AccessButton";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { observer } from "mobx-react";
import UsersStore from "../../store/UsersStore";
import Loader from "../../components/Loader";
import Popup from "reactjs-popup";
import PopupComponent from "../../components/popups/PopupComponent/PopupComponent";
import useClickOutside from "../../helpers/hooks/useClickOutside";
import { AcceptIcon } from "../../icons";
import { computedFn } from "mobx-utils";

const UsersPage = observer(() => {
  const [search, setSearch] = useState("");

  const {
    users,
    permissions,
    getUsers,
    getPermissions,
    isUsersFetching,
    isPermissionsFetching,
    setPermissions,
    isPermissionsSetFetching,
  } = UsersStore;

  useEffect(() => {
    if (!users.get().length) {
      getUsers();
    }

    if (!permissions.get().length) {
      getPermissions();
    }

    return () => {
      UsersStore.users.get().clear();
      UsersStore.permissions.get().clear();
    };
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Пользователи</h2>
          <SearchQuick
            setSearch={setSearch}
            placeholderText="Найти пользователя по имени"
          />
        </div>
        <div className={styles.button}>
          <Button text="Пригласить" />
        </div>
      </div>
      {computedFn(
        (users, isUsersFetching) => users.get().length && !isUsersFetching
      )(users, isUsersFetching) ? (
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>
                <Checkbox label="username" />
              </th>
              <th className={styles.role}>Разрешения</th>
              <th>Доступ персонала</th>
              <th>Доступ супер-пользователя</th>
              <th>E-mail</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users
              .get()
              .filter(({ username, last_name, first_name }) =>
                last_name?.length && first_name?.length
                  ? `${first_name} ${last_name}`
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : username.toLowerCase().includes(search.toLowerCase())
              )
              .map(
                ({
                  pk,
                  username,
                  last_name,
                  first_name,
                  is_staff,
                  is_superuser,
                  user_permissions,
                  email,
                }) => (
                  <tr className={styles.name} key={`user-${pk}`}>
                    <td className={styles.name}>
                      <Checkbox
                        className={styles.checkbox}
                        label={
                          last_name?.length && first_name?.length
                            ? `${first_name} ${last_name}`
                            : username
                        }
                      />
                    </td>
                    <RolesDropdown
                      permissions={permissions.get()}
                      userPermissions={user_permissions}
                      userName={
                        last_name?.length && first_name?.length
                          ? `${first_name} ${last_name}`
                          : username
                      }
                      isFetching={isPermissionsFetching}
                      isSetFetching={isPermissionsSetFetching}
                      setPermissions={setPermissions}
                      userId={pk}
                    />
                    <td className={styles.icon}>
                      {is_staff ? <AcceptIcon /> : <DeclineIcon />}
                    </td>
                    <td className={styles.icon}>
                      {is_superuser ? <AcceptIcon /> : <DeclineIcon />}
                    </td>
                    <td className={styles.icon}>
                      {email?.length ? (
                        <a className={styles.link} href={`mailto:${email}`}>
                          {email}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <ButtonIcon Icon={MoreIcon} className={styles.btnMore} />
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      ) : (
        <div className={styles.loader}>
          {isUsersFetching ? <Loader types={["medium"]} /> : "Не найдено ни одного пользователя"}
        </div>
      )}
    </div>
  );
});

export default UsersPage;

const RolesDropdown = ({
  permissions,
  userPermissions,
  userName,
  isFetching,
  isSetFetching,
  setPermissions,
  userId,
}) => {
  const ref = useRef(null);
  const [isRoleSelect, setIsRoleSelect] = useState(false);
  const [newPermissions, setNewPermissions] = useState([]);

  useEffect(() => {
    setNewPermissions(userPermissions);
  }, [userPermissions]);

  const isRoleSelectClickHandler = () =>
    setIsRoleSelect((prevState) => !prevState);

  useClickOutside({ ref, onClickOutside: () => setIsRoleSelect(false) });

  const handleSet = () => {
    const ids = newPermissions.map(({ id }) => id);

    setPermissions({
      permissionsIds: ids,
      action: "update",
      userId,
    });
    setIsRoleSelect(false);
  };

  const handlePermissionsChange = (e, permission) => {
    setNewPermissions((prevState) => {
      const newState = [...prevState];

      if (e.target.checked) {
        newState.push(permission);
      } else {
        newState.splice(newState.indexOf(permission), 1);
      }

      return newState;
    });
  };

  const handleAllSelect = (e) => {
    if (e.target.checked) {
      setNewPermissions([...permissions]);
    } else {
      setNewPermissions([]);
    }
  };

  const handleClear = () => {
    setNewPermissions([]);
    setIsRoleSelect(false);
  };

  return (
    <td className={styles.dropdown} ref={ref}>
      <p onClick={isRoleSelectClickHandler}>
        Permissions <ArrowDownIcon isOpen={isRoleSelect} />
      </p>
      {isRoleSelect ? (
        <div className={styles.wrap}>
          {!isFetching ? (
            <>
              <p className={styles.head}>Choose a permissions to user</p>
              <Checkbox
                className={cn(styles.item, {
                  [styles.item__selected]:
                    newPermissions.length === permissions.length,
                })}
                label="Select all"
                onChange={(e) => handleAllSelect(e)}
                checked={newPermissions.length === permissions.length}
              />
              {permissions.map((item) => (
                <Checkbox
                  className={cn(styles.item, {
                    [styles.item__selected]: newPermissions.find(
                      (perm) => item.id === perm.id
                    ),
                  })}
                  label={item.name}
                  onChange={(e) => handlePermissionsChange(e, item)}
                  checked={newPermissions.find((perm) => item.id === perm.id)}
                />
              ))}
              <div className={styles.itemButtons}>
                <Popup
                  modal
                  trigger={<Button text="Set" fetching={isSetFetching} />}
                >
                  {(close) => (
                    <PopupComponent
                      onClose={close}
                      titleText="Set permissions"
                      buttonText="Set permissions"
                      text="You sure you want to set"
                      dedicatedText={
                        newPermissions.length !== permissions.length
                          ? newPermissions.map(
                              (permission, index) =>
                                permission.name +
                                `${
                                  index !== newPermissions.length - 1
                                    ? ", "
                                    : ""
                                }`
                            )
                          : "All"
                      }
                      additionalText={`${
                        newPermissions.length > 1
                          ? "these"
                          : !!newPermissions.length
                          ? "this"
                          : ""
                      } ${!!newPermissions.length ? "permission" : ""} ${
                        newPermissions.length > 1 ? "s" : ""
                      } to`}
                      additionalDedicatedText={userName}
                      additionalText2="?"
                      onClick={handleSet}
                    />
                  )}
                </Popup>
                <Button
                  text="Cancel"
                  className={"maintenance"}
                  onClick={handleClear}
                />
              </div>
            </>
          ) : (
            <div className={styles.loader}>
              <Loader types={["small"]} />
            </div>
          )}
        </div>
      ) : null}
    </td>
  );
};
