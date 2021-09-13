import styles from "./additional-info.module.scss";
import { ArrowDownIcon, SpeedIcon, TempIcon } from "icons";
import cn from "classnames";
import SliderCheckbox from "components/SliderCheckbox";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import DropDownFields from "../DropDownFields";

const AdditionalInfo = observer(({ leftTitle, rightTitle }) => {
  console.table(123);
  const items = [
    {
      name: "Cameras",
      result: "All cameras are working",
      error: "All cameras are working",
      // description: `All cameras working`,
      // cameras: [53, 54, 55, 56],
      canOpen: true,
    },
    {
      name: "Lateral cameras",
    },
  ];

  const { storeInfo } = StoresStore;

  const infoFields = [
    {
      visibleName: "GPU",
      items: [
        {
          keyName: "gpu_temp",
          icon: <TempIcon />,
        },
        {
          icon: <SpeedIcon />,
          keyName: "gpu_util",
        },
        {
          visibleName: "Nvidia driver",
          keyName: "nvidia_driver_version",
        },
      ],
    },
    {
      visibleName: "CPU",
      items: [
        {
          icon: <SpeedIcon />,
          keyName: "cpu_util",
        },
      ],
    },
    {
      visibleName: "System",
      items: [
        {
          visibleName: "OS",
          keyName: "machine_os",
        },
        {
          visibleName: "OS kernel",
          keyName: "machine_os_kernel",
        },
        {
          visibleName: "Name",
          keyName: "name",
        },
        {
          visibleName: "Docker version",
          keyName: "docker_version",
        },
        {
          visibleName: "Internet speed",
          keyName: "internet_speed",
        },
        {
          visibleName: "Local IP",
          keyName: "local_ip",
        },
        {
          visibleName: "Public IP",
          keyName: "public_ip",
        },
        {
          visibleName: "Password",
          keyName: "password",
        },
        {
          visibleName: "Teamviewer ID",
          keyName: "teamviewer_id",
        },
        {
          visibleName: "Teamviewer password",
          keyName: "teamviewer_password",
        },
        {
          visibleName: "Username",
          keyName: "username",
        },
        {
          visibleName: "VPN IP",
          keyName: "vpn_ip",
        },
      ],
    },
  ];

  return (
    <div className={styles.system}>
      <div className={styles.head}>
        <span>{leftTitle}</span>
        <span>{rightTitle}</span>
      </div>
      <div
        className={styles.item + " " + styles.opened + " " + styles.dropdown}
      >
        <button className={styles.dropdownHead}>
          <p className={cn(styles.category, styles.categoryDropdown)}>
            {items[0].name}
            {items[0].canOpen ? <ArrowDownIcon /> : ""}
          </p>
          {/* <div className={
            styles.check
            // styles.resultError
          }>{items[0].result}</div> */}
        </button>
        <div className={styles.text}>
          {/* <div>
            <span className={
              // styles.error
              styles.check
              }>{items[0].error}</span>
            <p className={styles.descr}>
              {items[0].description}
            </p>
          </div> */}
          <div>
            {storeInfo.cameras &&
              storeInfo.cameras.map((camera) => (
                <SliderCheckbox
                  key={camera.id}
                  label={camera.view_name}
                  passed={camera.passed}
                />
              ))}
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <p className={cn(styles.category, styles.categoryDropdown)}>
          Lateral cameras
          <ArrowDownIcon />
        </p>
        <div
          className={`${styles.check} ${
            storeInfo.is_all_lateral_works ? "" : styles.error
          }`}
        >
          {storeInfo.is_all_lateral_works
            ? "All cameras are working"
            : "Check failed"}
        </div>
      </div>
      {infoFields.map((field) => (
        <DropDownFields field={field} key={field.visibleName} />
      ))}
      {/* <div className={styles.item}>
        <p className={styles.category}>GPU</p>
        <div className={styles.resultInfo}>
          <div className={styles.temp}>
            <TempIcon />
            <span>68</span>
          </div>
          <div className={styles.process}>
            <SpeedIcon />
            <span>80%</span>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>CPU</p>
        <div className={styles.resultInfo}>
          <div className={styles.temp}>
            <TempIcon />
            <span>34</span>
          </div>
          <div className={styles.processHigh}>
            <SpeedIcon />
            <span>90%</span>
          </div>
        </div>
      </div> */}
      {/* <div className={styles.item}>
        <p className={styles.category}>Videocard</p>
        <span className={styles.result}>NVIDIA RTX2080 SUPER</span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>Network card</p>
        <span className={styles.result}>TP-Link AC1300 PCIe</span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>CPU type</p>
        <span className={styles.result}>
          Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz
        </span>
      </div>
      <div className={styles.item}>
        <p className={styles.category}>OS</p>
        <span className={styles.result}>Windows 10, version 20H2</span>
      </div> */}
    </div>
  );
});

export default AdditionalInfo;
