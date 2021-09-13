import ButtonIcon from "components/buttons/ButtonIcon";
import { MoreIcon, SortIcon } from "icons";
import styles from "./launch.module.scss";
import Checkbox from "components/Checkbox";
import { useState } from "react";
import Button from "../../../components/buttons/Button";
import ScriptsStoresTable from "../../../components/ScriptsStoresTable/ScriptsStoresTable";

export default function InnerLaunch(props) {
  const [rows, setRows] = useState([
    {
      key: "",
      value: "",
    },
    {
      key: "",
      value: "",
    },
    {
      key: "",
      value: "",
    },
  ]);

  const [enabledStores, setEnabledStores] = useState(["123", "456", '98234', '47283' ]);

  const handleChange = (value, index, isKey) => {
    setRows((prev) => {
      prev.splice(index, 1, {
        ...prev[index],
        [isKey ? "key" : "value"]: value,
      });
      return [...prev];
    });
  };

  return (
    <div className={styles.page}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            {/* <th>
              <Checkbox label="Store name" className={styles.checkboxHead} />
            </th>
            <th>Region</th>
            <th className={styles.location}>Location</th> */}
            <th>Variables</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={styles.table_row}>
              <td>
                <input
                  type="text"
                  value={row.key}
                  placeholder="Variable"
                  onChange={(e) => handleChange(e.target.value, index, true)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.value}
                  placeholder="Value"
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              </td>
            </tr>
          ))}
          <tr className={styles.button_row}>
            <Button
              text="Add row"
              onClick={() =>
                setRows((prev) => [...prev, { key: "", value: "" }])
              }
            />
            {/* <Button text="save" onClick={() => console.log(rows)} /> */}
          </tr>
        </tbody>
      </table>
      <ScriptsStoresTable
        enabledStores={enabledStores}
        setEnabledStores={setEnabledStores}
      />
    </div>
  );
}
