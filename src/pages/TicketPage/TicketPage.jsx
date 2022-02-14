import { observer } from "mobx-react";
import styles from "./ticket-page.module.scss";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import "./customDatePicker.scss";
import AddTicketPage from "../AddTicketPage";
import TicketInfo from "../../components/Ticket/TicketInfo";
import TicketsStatsPage from "../TicketsStatsPage";

const TicketPage = observer((props) =>
  +props.match.params.id ? (
    <div className={styles.wrapper}>
      <TicketInfo id={+props.match.params.id} />
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  ) : props.match.params.id === "create-ticket" ? (
    <AddTicketPage />
  ) : props.match.params.id === "stats" ? (
    <TicketsStatsPage />
  ) : null
);

export default TicketPage;
