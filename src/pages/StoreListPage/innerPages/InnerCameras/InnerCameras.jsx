import styles from "./inner-camers.module.scss";
import ButtonIcon from "components/buttons/ButtonIcon";
import { OpenPathIcon, RefreshIcon, SaveVideo } from "icons";
import Button from "components/buttons/Button";
import FileCard from "components/cards/FileCard";
import cameraScreen from "images/cameraScreen.jpg";
import cameraScreen2 from "images/cameraScreen2.jpg";
import { observer } from "mobx-react";
import StoresStore from "../../../../store/StoresStore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toJS } from "mobx";
import Loader from "../../../../components/Loader";
import ImageCard from "../../../../components/cards/ImageCard1";

const InnerCameras = observer((props) => {
  const { storeInfo, cameras, isCamerasFetching } = StoresStore;
  const [error, setError] = useState("");
  const history = useHistory();
  const mapperCameras = [
    {
      visibleName: "Name",
      name: "view_name",
    },
    {
      visibleName: "IP",
      name: "ip_address",
    },
    {
      visibleName: "Can record",
      name: "can_record_video",
    },
    {
      visibleName: "Profile3 configured",
      name: "is_profile3_configured",
    },
    {
      visibleName: "Profile5 configured",
      name: "is_profile5_configured",
    },
    {
      visibleName: "User configured",
      name: "is_user_configured",
    },
    {
      visibleName: "Admin configured",
      name: "is_admin_configured",
    },
    {
      visibleName: "Packet loss",
      name: "packet_loss",
    },
    {
      visibleName: "Ping",
      name: "ping",
    },
    {
      visibleName: "Reachable",
      name: "reachable",
    },
    {
      visibleName: "Working",
      name: "passed",
    },
    {
      visibleName: "Updated",
      name: "timestamp",
    },
  ];

  const addStyles = (key, value) => {
    if (key === "packet_loss") {
      return +value > 10 ? styles.red : styles.green;
    } else if (key === "ping") {
      return +value > 5 ? styles.red : styles.green;
    } else if (
      key !== "ip_address" &&
      key !== "timestamp" &&
      key !== "view_name"
    ) {
      return value === null
        ? styles.warning
        : value
        ? styles.check
        : styles.error;
    } else return styles.text;
  };

  const store_id = +props.match.params.id;

  useEffect(() => {
    if (storeInfo.store_id === store_id) {
      cameras.set(null);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h2 className={styles.title}>Cameras</h2>
        <div className={styles.buttons}>
          {/*<ButtonIcon Icon={OpenPathIcon} />
          <ButtonIcon Icon={SaveVideo} />
          <ButtonIcon Icon={RefreshIcon} />*/}
          <Button
            onClick={() => history.push("/scripts")}
            text="Plan video recording"
          />
        </div>
      </div>
      {!isCamerasFetching && cameras.get() && cameras.get().length ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {mapperCameras.map((key) => (
                  <th className={styles.table_keys} key={key.name}>
                    {key.visibleName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cameras.get() &&
                cameras.get().map((camera) => (
                  <tr key={camera.view_name}>
                    {mapperCameras.map((key) => (
                      <td
                        key={key.name}
                        className={addStyles(key.name, camera[key.name])}
                      >
                        {camera[key.name] !== undefined &&
                        key.name === "timestamp"
                          ? `${new Date(
                              camera[key.name]
                            ).toLocaleDateString()} ${new Date(
                              camera[key.name]
                            ).toLocaleTimeString("en-US", { hour12: false })}`
                          : key.name === "packet_loss"
                          ? `${
                              camera[key.name] ? camera[key.name] + "%" : "N/A"
                            }`
                          : key.name === "ping"
                          ? `${
                              camera[key.name] ? camera[key.name] + "ms" : "N/A"
                            }`
                          : camera[key.name]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={styles.cards}>
            {cameras.get() &&
              cameras
                .get()
                .map((camera) => (
                  <ImageCard
                    url={camera.preview}
                    name={`${camera.view_name} .${
                      camera.ip_address &&
                      camera.ip_address.split(".")[
                        camera.ip_address.split(".").length - 1
                      ]
                    }`}
                  />
                ))}
          </div>
        </>
      ) : (
        <div className={styles.loader}>
          {isCamerasFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "No cameras on this store"
          )}
        </div>
      )}
    </div>
  );
});

export default InnerCameras;
