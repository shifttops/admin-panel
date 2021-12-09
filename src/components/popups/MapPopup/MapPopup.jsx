import styles from "./map-popup.module.scss";
import { CloseIcon } from "icons";
import Map from "../../Map";
import { refreshToken } from "../../../helpers/AuthHelper";
import { useEffect, useState } from "react";

const MapPopup = ({ onClose, onClick, buttonText, titleText }) => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const getCoords = async () => {
      try {
        await refreshToken();

        const resp = await fetch(
          `${process.env.REACT_APP_URL}/api/coordinates/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("access")}`,
            },
          }
        );
        if (resp.status === 200) {
          const res = await resp.json();
          setCoords(res.results);
          // this.metrics.set({ ...res });
          // setError("");
        }
      } catch (e) {
        // setError(e.message);
        console.log(e.message);
      }
    };

    getCoords();
  }, []);
  
  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>{titleText}</span>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1IYf4NISwcdUmBrgxPOBVA3jieNRN7eU&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        coords={coords}
      />
    </div>
  );
};

export default MapPopup;
