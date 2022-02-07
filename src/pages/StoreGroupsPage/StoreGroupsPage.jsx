import styles from "./store-groups-page.module.scss";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import { DeleteIcon, MoreIcon } from "icons";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import { observer } from "mobx-react";
import StoresStore from "../../store/StoresStore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import routes from "../../constants/routes";

const StoreGroupsPage = observer(() => {
  const { groups, enabledFilters, getGroups } = StoresStore;
  const [error, setError] = useState("");
  const history = useHistory();

  const handleClick = (id) => {
    // enabledFilters['group_ids'] = [id];я
    history.push(`${routes.home}?group_ids=${id}`);
  };

  useEffect(() => {
    getGroups(setError);
  }, []);

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <div className={styles.pageInfo}>
          <h2 className={styles.title}>Store groups</h2>
          <SearchQuick />
        </div>
        <div className={styles.buttons}>
          <ButtonIcon Icon={DeleteIcon} className={styles.deleteIcon} />
          <Button text="Create group" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>
              <Checkbox label="user" />
            </th>
            <th>Name</th>
            <th>Stores</th>
            <th>Type</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr
              className={styles.table__item}
              key={group.id}
              onClick={() => handleClick(group.id)}
            >
              <td className={styles.name}>
                <Checkbox
                  className={styles.checkbox}
                  label={group.owner ? group.owner : ""}
                />
              </td>
              <td className={styles.text}>{group.name}</td>
              <td className={styles.text}>{group.count} restaurants</td>
              <td className={styles.text}>{group.group_type}</td>

              <td>
                <ButtonIcon Icon={MoreIcon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default StoreGroupsPage;
