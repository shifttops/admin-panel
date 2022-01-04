import styles from "./settings-page.module.scss";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import SliderCheckbox from "components/SliderCheckbox";
import { observer } from "mobx-react";
import AppStore from "../../store/AppStore";
import { notificationSettingsMapper } from "../../helpers/mappers";
import Loader from "../../components/Loader";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { useEffect, useState } from "react";

const SettingsPage = observer((props) => {
  const {
    notificationSettings,
    updateNotificationsSettings,
    getNotificationSettings,
    isLoadingNotificationSettings,
    isUpdatingNotificationSettings,
  } = AppStore;

  const [notificationsList, setNotificationsList] = useState([]);

  useEffect(async () => {
    await getNotificationSettings();
    setNotificationsList(notificationSettings.get());

    return () => {
      if (notificationsList.length) setNotificationsList([]);
    };
  }, [notificationSettings]);

  const handleNotificationSettingsChange = (e, field) => {
    if (e.currentTarget.checked) {
      setNotificationsList((prevState) => [...prevState, field]);
    } else {
      const newArray = [...notificationsList];
      newArray.splice(newArray.indexOf(field), 1);
      setNotificationsList(newArray);
    }
  };

  const handleSave = async () =>
    await updateNotificationsSettings({
      isSettingsOnly: true,
      notificationsList,
    });

  return (
    <div className="page">
      <div className={styles.pageHead}>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.button}>
          <Button
            fetching={isUpdatingNotificationSettings}
            onClick={handleSave}
            text="Save"
            className={styles.btnSave}
          />
        </div>
      </div>
      <div className={styles.tabs}>
        <button className={styles.link + " " + styles.active}>
          Notification
        </button>
        <button className={styles.link}>Account</button>
        <button className={styles.link}>Intergations</button>
      </div>
      <div className={styles.block}>
        <div className={styles.category}>
          <p className={styles.name}>Notification</p>
          <p className={styles.descr}>Select the type of notifications</p>
        </div>
        <div className={styles.settings}>
          {!isLoadingNotificationSettings ? (
            notificationSettingsMapper.map((item) => (
              <Checkbox
                key={`${item.field}:${
                  notificationsList.includes(item.field)
                    ? "checked"
                    : "unchecked"
                }`}
                label={item.label}
                checked={notificationsList.includes(item.field)}
                className={styles.checkbox}
                onChange={(e) =>
                  handleNotificationSettingsChange(e, item.field)
                }
              />
            ))
          ) : (
            <div className={styles.loader}>
              <Loader types={["small"]} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.category}>
          <p className={styles.name}>How to receive notifications</p>
          <p className={styles.descr}>Receive notifications</p>
        </div>
        <div className={styles.settings}>
          <div className={styles.choice}>
            <SliderCheckbox label="Email" className={styles.sliderCheckbox} />
            <p className={styles.label}>Your email</p>
            <input
              className={styles.input}
              placeholder="bill.sanders@example.com"
            />
          </div>
          <div className={styles.choice}>
            <SliderCheckbox
              label="Telegram"
              className={styles.sliderCheckbox}
            />
            <p className={styles.label}>Phone number</p>
            <input className={styles.input} placeholder="(684) 555-0102" />
          </div>
          <div className={styles.choice}>
            <SliderCheckbox label="Slack" className={styles.sliderCheckbox} />
            <p className={styles.label}>Your id number</p>
            <input
              className={styles.input}
              placeholder="http://www.toughzap.com"
            />
          </div>
        </div>
      </div>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default SettingsPage;
