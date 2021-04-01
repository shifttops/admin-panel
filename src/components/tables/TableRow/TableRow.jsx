import { CheckIcon, ConfigIcon, MoreIcon } from "../../../icons/icons";
import ButtonIcon from "../../buttons/ButtonIcon/ButtonIcon";
import Checkbox from "../../Checkbox/Checkbox";
import styles from "./tableRow.module.scss";
import { NavLink } from "react-router-dom";
import routes from "../../../constants/routes";

export default function TableRow({ status, Icon }) {
  return (
    <tr>
      <td>
        <Checkbox label="20209" />
      </td>
      <td>Maria-Probst-Straße 1</td>
      <td>München</td>
      <td className={styles.store__center}>Franchise</td>
      <td className={styles.store__status}>
        <div className={styles.store__icon}>
          <ConfigIcon />
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
