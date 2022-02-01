import { MoreIcon } from "../../../icons/icons";
import Checkbox from "../../Checkbox/Checkbox";
import styles from "./table-row.module.scss";
import { useHistory } from "react-router-dom";
import routes from "constants/routes";
import ButtonIcon from "components/buttons/ButtonIcon";
import statusButtonTypes from "types/statusButtonTypes";
import cn from "classnames";
import { useState } from "react";
import { storeStatusMapper } from "../../../helpers/mappers";

const statusButtonTypeMap = {
  [statusButtonTypes.deployed]: styles.deployed,
  [statusButtonTypes.configuration]: styles.configuration,
  [statusButtonTypes.test]: styles.test,
  [statusButtonTypes.deployment]: styles.deployment,
  [statusButtonTypes.ready]: styles.ready,
  [statusButtonTypes.maintenance]: styles.maintenance,
};

export default function TableRow({
  status,
  Icon,
  id,
  address,
  StatusIcon,
  region,
  type = "Franchise",
  date_deployed,
  date_ready_deployed,
  checkedStores,
  setCheckedStores,
}) {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [checked, setIsChecked] = useState(checkedStores.includes(id));

  const handleClick = async () => {
    history.push(`${routes.storeInfo}/${id}`);
  };

  const handleOpenMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleStoreCheck = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setCheckedStores((prev) => {
      if (prev.includes(id)) {
        prev.splice(prev.indexOf(id), 1);
        return prev;
      } else {
        return [...prev, id];
      }
    });
    setIsChecked((prev) => !prev);
  };

  return (
    <tr className={styles.tableRow} onClick={handleClick}>
      <td onClick={(e) => handleStoreCheck(e, id)}>
        <Checkbox
          checked={checkedStores.includes(id)}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </td>
      <td>{id}</td>
      <td>{address}</td>
      <td>{region}</td>
      <td className={styles.store__center}>{type}</td>
      <td className={styles.store__status}>
        <div
          className={cn(
            styles.store__icon,
            storeStatusMapper.find((item) => item.name === status)?.className
          )}
        >
          {StatusIcon}
          {storeStatusMapper.find((item) => item.name === status)?.visibleName}
        </div>
      </td>
      <td>{date_ready_deployed}</td>
      <td>{date_deployed}</td>
      <td>
        <ButtonIcon
          className={styles.store__more}
          onClick={handleOpenMore}
          Icon={MoreIcon}
        />
      </td>
    </tr>
  );
}
