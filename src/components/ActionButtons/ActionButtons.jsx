import styles from "./action_buttons.module.scss";
import { VersionIcon } from "icons";
import Button from "components/buttons/Button";
import ButtonIcon from "components/buttons/ButtonIcon";
import { observer } from "mobx-react";
import StoresStore from "../../store/StoresStore";

const ActionButtons = observer(({ url, setLogId, isFetching }) => {
  const { manageStore } = StoresStore;

  const handleClick = async () => {
    if (url) {
      setLogId(await manageStore(url));
      setTimeout(() => setLogId(""), 5000);
    }
  };
  return (
    <div className={styles.buttons}>
      <div className={styles.type}>
        <ButtonIcon Icon={VersionIcon} />
      </div>
      {/* <Button className={styles.borderGreen} text="Old version" />
      <Button className={styles.yellow} text="Add a new" /> */}
      <Button
        fetching={isFetching}
        disabled={!url}
        text="Update"
        onClick={handleClick}
      />
    </div>
  );
});
export default ActionButtons;
