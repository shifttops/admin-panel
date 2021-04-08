import styles from "./inner-history.module.scss";
import { ArrowDownIcon, MoreIcon, SortIcon } from "icons";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import SearchQuick from "components/search/SearchQuick";
import ButtonIcon from "components/buttons/ButtonIcon";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import routes from "constants/routes";

export default function InnerHistory() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.search}>
          <h2 className={styles.title}>History</h2>
          <SearchQuick />
          <ButtonIcon Icon={SortIcon} />
        </div>

        <div className={styles.buttons}>
          <Button text="Choose period" />
          <Button text="Create Report" />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <Checkbox label="event type" />
            </th>
            <th>Message</th>
            <th>DATE</th>
            <th>Time</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox label="Сar arrived" />
            </td>
            <td className={styles.error}>
              RuntimeError('[enforce fail at inline_container.cc:222]...
              <span>
                <ArrowDownIcon />
              </span>
            </td>
            <td>2021-01-28</td>
            <td>10:15</td>
            <td>
              <NavLink to={routes.storeInfo}>
                <ButtonIcon Icon={MoreIcon} />
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox label="Сar arrived" />
            </td>
            <td className={cn(styles.error, styles.opened)}>
              RuntimeError('[enforce fail at inline_container.cc:222]file not
              found: archive/constants.pkl',):\n Traceback (most recent call
              last):\n File \"/app/entities/StoreManager.py\", line 148, in
              run\n self.update_history()\n File
              \"/app/entities/StoreManager.py\", line 75, in update_history\n
              ClassificationModel.net_predict(cam_views)\n File
              \"/app/utils/ClassificationModel.py\", line 65, in net_predict\n
              ClassificationModel()\n File
              \"/app/utils/ClassificationModel.py\", line 46, in __init__\n
              pytorch_backend = PyTorchBackend()\n File
              \"/app/utils/ClassificationModel.py\", line 318, in __init__\n
              GlobalConfig['Classification']['PyTorch']['checkpoint_path'])\n
              File
              \"/usr/local/lib/python3.6/dist-packages/torch/jit/_serialization.py\",
              line 161, in load\n cpp_module = torch._C.import_ir_module(cu, f,
              map_location, _extra_files)\nRuntimeError: [enforce fail at
              inline_container.cc:222] . file not found:
              archive/constants.pkl\n"
              <span>
                <ArrowDownIcon />
              </span>
            </td>
            <td>2021-01-28</td>
            <td>10:15</td>
            <td>
              <NavLink to={routes.storeInfo}>
                <ButtonIcon Icon={MoreIcon} />
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox label="Сar arrived" />
            </td>
            <td className={styles.error}>
              RuntimeError('[enforce fail at inline_container.cc:222]...
              <span>
                <ArrowDownIcon />
              </span>
            </td>
            <td>2021-01-28</td>
            <td>10:15</td>
            <td>
              <NavLink to={routes.storeInfo}>
                <ButtonIcon Icon={MoreIcon} />
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
