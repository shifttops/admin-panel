import styles from "./table-row.module.scss";
import { NavLink } from "react-router-dom";
import Checkbox from "components/Checkbox";
import { ConfigIcon, MoreIcon } from "icons";
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

export default function TableRow({
  status,
  Icon = () => null,
  StatusIcon,
  type,
}) {
  return (
    <tr className={styles.tableRow}>
      <td>
        <Checkbox label="20209" />
      </td>
      <td>Maria-Probst-Straße 1</td>
      <td>München</td>
      <td className={styles.store__center}>Franchise</td>
      <td className={styles.store__status}>
        <div className={cn(styles.store__icon, statusButtonTypeMap[type])}>
          {StatusIcon}
          {status}
        </div>
      </td>
      <td>21.03.21</td>
      <td>21.03.21</td>
      <td>
        <NavLink to={routes.storeInfo} className={styles.store__more}>
          <ButtonIcon Icon={MoreIcon} />
        </NavLink>
      </td>
    </tr>
  );
}
