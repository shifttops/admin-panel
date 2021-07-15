import moment from 'moment';
import { CheckIcon, ConfigIcon, MoreIcon } from "../../../icons/icons";
import Checkbox from "../../Checkbox/Checkbox";
import styles from "./table-row.module.scss";
import { Link, NavLink, useHistory } from "react-router-dom";
import routes from "constants/routes";
import ButtonIcon from "components/buttons/ButtonIcon";
import statusButtonTypes from "types/statusButtonTypes";
import iconButtonTypes from "types/iconButtonTypes";
import cn from "classnames";
import StoresStore from '../../../store/StoresStore';
import { useState } from 'react';
import { statusMapper } from '../../../helpers/mappers';

const statusButtonTypeMap = {
  [statusButtonTypes.deployed]: styles.deployed,
  [statusButtonTypes.configuration]: styles.configuration,
  [statusButtonTypes.test]: styles.test,
  [statusButtonTypes.deployment]: styles.deployment,
  [statusButtonTypes.ready]: styles.ready,
  [statusButtonTypes.maintenance]: styles.maintenance,
};

export default function TableRow({ status, Icon, id, address, StatusIcon, region, type = 'Franchise', date_deployed, date_ready_deployed }) {
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleClick = async () => {
    history.push(`${routes.storeInfo}/${id}`)
  }

  const handleOpenMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <tr className={styles.tableRow} onClick={handleClick}>
      <td>
        <Checkbox/>
      </td>
      <td>{id}</td>
      <td>{address}</td>
      <td>{region}</td>
      <td className={styles.store__center}>{type}</td>
      <td className={styles.store__status}>
        <div className={cn(styles.store__icon, statusMapper.find(item => item.name === status)?.className)}>
          {StatusIcon}
          {statusMapper.find(item => item.name === status)?.visibleName}
        </div>
      </td>
      <td>{date_ready_deployed}</td>
      <td>{date_deployed}</td>
      <td>
        <button className={styles.store__more} onClick={handleOpenMore}>
          <ButtonIcon Icon={MoreIcon} />
        </button>
      </td>
    </tr>
  );
}
