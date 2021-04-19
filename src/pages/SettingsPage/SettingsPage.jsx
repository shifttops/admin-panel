import styles from "./settings-page.module.scss";
import Button from "components/buttons/Button";
import Checkbox from "components/Checkbox";
import SliderCheckbox from "components/SliderCheckbox";

export default function SettingsPage(params) {
  return (
    <div className="page">
      <div className={styles.pageHead}>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.button}>
          <Button text="Save" className={styles.btnSave} />
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
          <p className={styles.descr}>Receive notifications</p>
        </div>
        <div className={styles.settings}>
          <Checkbox label="New restaurants" className={styles.checkbox} />
          <Checkbox
            label="Changing restaurant statuses"
            className={styles.checkbox}
          />
          <Checkbox label="Restaurant openings" className={styles.checkbox} />
          <Checkbox
            label="New messages in chat with the restaurant"
            className={styles.checkbox}
          />
          <Checkbox
            label="Of performing scheduled events"
            className={styles.checkbox}
          />
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
    </div>
  );
}
