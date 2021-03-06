import styles from "./dropdown_fields.module.scss";
import { ArrowDownIcon, SpeedIcon, TempIcon } from "icons";
import cn from "classnames";
import StoresStore from "../../../store/StoresStore";
import { observer } from "mobx-react";
import { useState } from "react";

const DropDownFields = observer(
  ({ field, serverIndex, softwareIndex = null }) => {
    const { storeInfo } = StoresStore;
    const [isOpen, setOpen] = useState(false);

    const handleClick = (e) => {
      setOpen((prev) => !prev);
      e.preventDefault();
      e.stopPropagation();
    };

    const serverFieldsMapper = [
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
            visibleName: "Max frequency",
            keyName: "cpu_max_frequency",
          },
          {
            visibleName: "Number of cores",
            keyName: "cpu_core_count",
          },
        ],
      },
      {
        visibleName: "Software",
        items: storeInfo.servers[serverIndex].software
          ? storeInfo.servers[serverIndex].software.map((softwareItem) => ({
              visibleName: softwareItem.name,
              softwareIndex:
                storeInfo.servers[serverIndex].software.indexOf(softwareItem),
              items: [
                {
                  visibleName: "Name",
                  keyName: "name",
                },
                {
                  visibleName: "Branch",
                  keyName: "branch",
                },
                {
                  visibleName: "Commit",
                  keyName: "commit",
                },
                {
                  visibleName: "Image name",
                  keyName: "image_name",
                },
                {
                  visibleName: "Image tag",
                  keyName: "image_tag",
                },
                {
                  visibleName: "Model configuration",
                  keyName: "model_configuraion",
                },
              ],
            }))
          : null,
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
    ];

    const [items, setItems] = useState(
      field ? field.items : serverFieldsMapper
    );

    return (
      <div className={styles.dropdownHead}>
        <button onClick={handleClick}>
          <div className={styles.item_row}>
            <p className={cn(styles.category, styles.categoryDropdown)}>
              {field ? field.visibleName : storeInfo.servers[serverIndex].name}
              <ArrowDownIcon isOpen={isOpen} />
            </p>
            <div className={styles.temp_info}>
              {items
                .filter(
                  (item) =>
                    item.icon &&
                    storeInfo.servers[serverIndex].name &&
                    storeInfo.servers[serverIndex].name !== "OEPE"
                )
                .map((item) => (
                  <div key={item.keyName} className={styles.resultInfo}>
                    <div
                      className={
                        item.keyName.includes("temp")
                          ? styles.temp
                          : styles.process
                      }
                    >
                      {item.icon}
                      <span>
                        {storeInfo[item.keyName] === 0 ||
                        storeInfo[item.keyName]
                          ? `${Math.round(storeInfo[item.keyName])} ${
                              item.keyName.includes("util") ? "%" : ""
                            }`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </button>
        <div className={styles.dropdown}>
          {isOpen
            ? items.map((item) =>
                item.items ? (
                  <DropDownFields
                    serverIndex={serverIndex}
                    softwareIndex={item.softwareIndex}
                    field={item}
                    key={item.visibleName}
                  />
                ) : !item.icon ? (
                  <div key={item.keyName} className={styles.item}>
                    <p className={styles.category}>{item.visibleName}</p>
                    <span className={styles.result}>
                      {items[1].keyName !== "branch"
                        ? storeInfo.servers[serverIndex][item.keyName]
                          ? storeInfo.servers[serverIndex][
                              item.keyName
                            ].toString()
                          : "N/A"
                        : storeInfo.servers[serverIndex].software &&
                          storeInfo.servers[serverIndex].software[
                            softwareIndex
                          ][item.keyName]
                        ? item.keyName === "model_configuraion"
                          ? JSON.stringify(
                              storeInfo.servers[serverIndex].software[
                                softwareIndex
                              ][item.keyName]
                            )
                          : storeInfo.servers[serverIndex].software[
                              softwareIndex
                            ][item.keyName].toString()
                        : "N/A"}
                    </span>
                  </div>
                ) : null
              )
            : null}
        </div>
      </div>
    );
  }
);

export default DropDownFields;
