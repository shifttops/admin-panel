import styles from "./map.module.scss";
import { VersionIcon } from "icons";
import Button from "components/buttons/Button";
import ButtonIcon from "components/buttons/ButtonIcon";
import { observer } from "mobx-react";
import StoresStore from "../../store/StoresStore";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useHistory } from "react-router-dom";
import routes from "../../constants/routes";

const {
  MarkerWithLabel,
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const Map = withScriptjs(
  withGoogleMap((props) => {
    const history = useHistory();

    const handleClick = (storeId) => {
      return () => {
        history.push(`${routes.storeInfo}/${storeId}`);
      }
    }
    
    return (
      <GoogleMap defaultZoom={7} defaultCenter={{ lat: 51.697, lng: 10.344 }}>
        {props.coords.map((item) =>
          item.latitude && item.longitude ? (
            <MarkerWithLabel
              key={item.store}
              position={{ lat: item.latitude, lng: item.longitude }}
              labelAnchor={new window.google.maps.Point(0, 0)}
              labelStyle={{
                backgroundColor: "#ababab",
                color: '#fff',
                fontSize: "14px",
                padding: "2px",
              }}
              onClick={handleClick(item.store)}
            >
              <div>{item.store}</div>
            </MarkerWithLabel>
          ) : (
            ""
          )
        )}
      </GoogleMap>
    )
  }
  )
);

export default Map;
