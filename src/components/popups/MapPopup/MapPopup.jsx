import styles from "./map-popup.module.scss";
import { CloseIcon } from "icons";
import Map from "../../Map";
import { refreshToken } from "../../../helpers/AuthHelper";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import { observer } from "mobx-react";
import StoresStore from "../../../store/StoresStore";

const MapPopup = observer(({ onClose, onClick, buttonText, titleText }) => {
  const {
    getStoresCoordinates: getCoords,
    isMapFetching,
    coordinates,
  } = StoresStore;

  useEffect(async () => {
    if (!coordinates.get().length) await getCoords();
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.popupHead}>
        <span className={styles.title}>{titleText}</span>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      {!isMapFetching ? (
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1IYf4NISwcdUmBrgxPOBVA3jieNRN7eU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coordinates.get()}
        />
      ) : (
        <div className={styles.loader}>
          <Loader types={["grey", "medium"]} />
        </div>
      )}
    </div>
  );
});

export default MapPopup;
