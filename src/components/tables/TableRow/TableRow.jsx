import moment from 'moment';
import { CheckIcon, ConfigIcon, MoreIcon } from "../../../icons/icons";
import Checkbox from "../../Checkbox/Checkbox";
import styles from "./table-row.module.scss";
import { NavLink } from "react-router-dom";
import routes from "constants/routes";
import ButtonIcon from "components/buttons/ButtonIcon";
import statusButtonTypes from "types/statusButtonTypes";
import iconButtonTypes from "types/iconButtonTypes";
import cn from "classnames";

const statusButtonTypeMap = {
  [statusButtonTypes.deployed]: styles.deployed,
  [statusButtonTypes.configuration]: styles.configuration,
  [statusButtonTypes.test]: styles.test,
  [statusButtonTypes.deployment]: styles.deployment,
  [statusButtonTypes.ready]: styles.ready,
  [statusButtonTypes.maintenance]: styles.maintenance,
};

export default function TableRow({ status, Icon, id, address, StatusIcon, region, type = 'Franchise', date_deployed, date_ready_deployed }) {

  return (
    <tr className={styles.tableRow}>
      <td>
        <Checkbox label={id} />
      </td>
      <td>{address}</td>
      <td>{region}</td>
      <td className={styles.store__center}>{type}</td>
      <td className={styles.store__status}>
        <div className={cn(styles.store__icon, statusButtonTypeMap[type])}>
          {StatusIcon}
          {status}
        </div>
      </td>
      <td>{date_ready_deployed ? moment(date_ready_deployed).format('DD.MM.YYYY') : 'N/A'}</td>
      <td>{date_deployed ? moment(date_deployed).format('DD.MM.YYYY') : 'N/A'}</td>
      <td>
        <NavLink to={routes.storeInfo} className={styles.store__more}>
          <ButtonIcon Icon={MoreIcon} />
        </NavLink>
      </td>
    </tr>
  );
}
