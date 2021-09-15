import styles from "./additional-info.module.scss";
import { ArrowDownIcon, SpeedIcon, TempIcon } from "icons";
import cn from "classnames";
import SliderCheckbox from "components/SliderCheckbox";
import StoresStore from "../../store/StoresStore";
import { observer } from "mobx-react";
import DropDownFields from "../DropDownFields";

const AdditionalInfo = observer(({ leftTitle, rightTitle }) => {
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

  const createServersInfo = (servers) => {

    if (servers) {
      let serverIndex = -1

      return servers.map((server) => {
        serverIndex++
        return {
          visibleName: server.name,
          serverIndex,
          items: [
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
                {
                  visibleName: "Device ID",
                  keyName: "gpu_device_id",
                },
                {
                  visibleName: "GPU memory size",
                  keyName: "gpu_memory_size",
                },
                {
                  visibleName: "Model",
                  keyName: "gpu_model",
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
                {
                  visibleName: "Name",
                  keyName: "cpu_name",
                },
                {
                  visibleName: 'Max frequency',
                  keyName: 'cpu_max_frequency'
                },
                {
                  visibleName: "Number of cores",
                  keyName: "cpu_core_count",
                },
              ],
            },
            {
              visibleName: "System",
              items: [
                {
                  visibleName: "Machine name",
                  keyName: "machine_name",
                },
                {
                  visibleName: "OS",
                  keyName: "machine_os",
                },
                {
                  visibleName: "OS Kernel",
                  keyName: "machine_os_kernel",
                },
                {
                  visibleName: "Server name",
                  keyName: "name",
                },
                {
                  visibleName: "Docker version",
                  keyName: "docker_version",
                },
                {
                  visibleName: "Cuda version",
                  keyName: "cuda_version",
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
                  visibleName: "VPN IP",
                  keyName: "vpn_ip",
                },
                {
                  visibleName: "Teamviewer ID",
                  keyName: "teamviewer_id",
                },
                {
                  visibleName: "Username",
                  keyName: "username",
                },
                {
                  visibleName: "Server memory size",
                  keyName: "memory_size",
                },
                {
                  visibleName: "Active",
                  keyName: "is_active",
                },
              ],
            },
          ],
        };
      });
    }
  };

  const serversInfo = createServersInfo(storeInfo.servers);

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
      {serversInfo && serversInfo.map((field) => (
          <DropDownFields serverIndex={field.serverIndex} field={field} key={field.visibleName} />
      ))}
    </div>
  );
});



export default AdditionalInfo;
