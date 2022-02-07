import styles from "../components/buttons/Button/button.module.scss";
import stylesTickets from "../components/Ticket/TicketStatus/ticket-status.module.scss";
import {
  DocIcon,
  ImagesIcon,
  PptIcon,
  VideoIcon,
  XlsIcon,
  ZipIcon,
} from "../icons";
import iconButtonTypes from "../types/iconButtonTypes";

import docImage from "../images/docImage.png";
import xlsImage from "../images/xlsImage.png";
import pptImage from "../images/pptImage.png";
import pdfImage from "../images/pdfImage.png";
import zipImage from "../images/zipImage.png";

export const storeStatusMapper = [
  {
    visibleName: "Store Deployed",
    name: "Store Deployed",
    className: styles.deployed,
    class: "deployed",
  },
  {
    visibleName: "Go Live",
    name: "Go Live",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Algorithm configuring",
    name: "Algorithm configuring",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "MCD blocked",
    name: "MCD blocked",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Deployment",
    name: "Deployment",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Epic Backlog",
    name: "Epic Backlog",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Store testing",
    name: "Store testing",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Software Issues",
    name: "Software issues",
    className: styles.maintenance,
    class: "maintenance",
  },
  {
    visibleName: "Hardware issues",
    name: "Hardware issues",
    className: styles.maintenance,
    class: "maintenance",
  },
  {
    visibleName: "Cameras position issue",
    name: "Cameras position issue",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Under Maintenance",
    name: "Under Maintenance",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Blocked",
    name: "Blocked",
    className: styles.test,
    class: "maintenance",
  },
  {
    visibleName: "Additional settings",
    name: "Additional settings",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Dashboard deployment",
    name: "Dashboard deployment",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Dashboard configuring",
    name: "Dashboard configuring",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "N/A",
    name: null,
    className: styles.maintenance,
    class: "maintenance",
  },
];

export const filtersRequestMapper = [
  {
    name: "status",
    reqName: "status__name",
  },
  {
    name: "store_type",
    reqName: "store_type",
  },
  {
    name: "date_created",
    reqName: "date_created__range",
  },
  {
    name: "date_deployment",
    reqName: "date_deployment__range",
  },
  {
    name: "view_name",
    reqName: "cameras__view_name",
  },
  {
    name: "machine_os",
    reqName: "servers__machine_os",
  },
  {
    name: "docker_version",
    reqName: "servers__docker_version",
  },
  {
    name: "nvidia_driver_version",
    reqName: "servers__nvidia_driver_version",
  },
  {
    name: "internet_speed",
    reqName: "servers__internet_speed__range",
  },
];

export const categoryMapper = [
  {
    visibleName: "Country",
    name: "country",
  },
  {
    visibleName: "State",
    name: "state",
  },
  {
    visibleName: "Region",
    name: "county",
  },
  {
    visibleName: "Location",
    name: "address",
  },
  {
    visibleName: "ZipCode",
    name: "zipcode",
  },
  {
    visibleName: "Store type",
    name: "store_type",
  },
  {
    visibleName: "Building type",
    name: "building",
  },
  {
    visibleName: "Number of drive zone",
    name: "driveZones",
  },
  {
    visibleName: "Date of deployment",
    name: "dod",
  },
  {
    visibleName: "Ready for deployment date",
    name: "rfd",
  },
  {
    visibleName: "fourDigitRestaurantID",
    name: "fourDigitRestaurantID",
  },
  {
    visibleName: "threeDigitRestaurantID",
    name: "threeDigitRestaurantID",
  },
];

export const filtersMapper = [
  {
    visibleName: "RFDD",
    name: "date_created",
  },
  {
    visibleName: "DOD",
    name: "date_deployment",
  },
  {
    visibleName: "Docker version",
    name: "docker_version",
  },
  {
    visibleName: "Internet speed",
    name: "internet_speed",
  },
  {
    visibleName: "OS",
    name: "machine_os",
  },
  {
    visibleName: "Nvidia driver",
    name: "nvidia_driver_version",
  },
  {
    visibleName: "Status",
    name: "status",
  },
  {
    visibleName: "Cameras",
    name: "view_name",
  },
  {
    visibleName: "Store type",
    name: "store_type",
  },
];

export const notificationSettingsMapper = [
  {
    label: "New restaurants",
    field: "new_stores",
  },
  {
    label: "Changing restaurant statuses",
    field: "store_status_change",
  },
  {
    label: "New messages in chat with the restaurant",
    field: "new_messages",
  },
  {
    label: "Results or errors on scripts running",
    field: "result_or_error_scripts",
  },
  {
    label: "Scripts launching",
    field: "scripts_running",
  },
];

export const ticketStatusMapper = [
  {
    visibleName: "Waiting for support",
    name: "SUPPORT",
    className: stylesTickets.blue,
  },
  {
    visibleName: "In progress",
    name: "PROGRESS",
    className: stylesTickets.blue,
  },
  {
    visibleName: "Resolved",
    name: "RESOLVED",
    className: stylesTickets.green,
  },
  {
    visibleName: "Canceled",
    name: "CANCELED",
    className: stylesTickets.red,
  },
];

export const fileTypesMapper = [
  {
    types: ["jpg", "jpeg", "png", "webp", "svg"],
    icon: ImagesIcon,
    type: iconButtonTypes.grey,
  },
  {
    types: ["mp4", "mkv", "mov", "avi", "flv"],
    icon: VideoIcon,
    type: iconButtonTypes.grey,
  },
  {
    types: ["docx", "doc", "txt", "rtf"],
    image: docImage,
    icon: DocIcon,
    type: iconButtonTypes.blue,
  },
  {
    types: ["xls", "xlsx"],
    image: xlsImage,
    icon: XlsIcon,
    type: iconButtonTypes.green,
  },
  {
    types: ["ppt", "pptx"],
    image: pptImage,
    icon: PptIcon,
    type: iconButtonTypes.yellow,
  },
  {
    types: ["pdf"],
    image: pdfImage,
    icon: ImagesIcon,
    type: iconButtonTypes.grey,
  },
  {
    types: ["zip", "rar", "gz"],
    image: zipImage,
    icon: ZipIcon,
    type: iconButtonTypes.yellow,
  },
];

export const ticketDetailsMapper = [
  {
    title: "Assignee",
    field: "assignee",
  },
  {
    title: "Ticket type",
    field: "type",
  },
  {
    title: "Reporter",
    field: "reporter",
  },
  {
    title: "Priority",
    field: "priority",
  },
  {
    title: "Stores",
    field: "stores",
  },
];

export const ticketPriorityMapper = [
  {
    visibleName: "Very high",
    name: "HIGHEST",
    Icon: () => {},
  },
  {
    visibleName: "High",
    name: "HIGH",
    Icon: () => {},
  },
  {
    visibleName: "Low",
    name: "LOW",
    Icon: () => {},
  },
  {
    visibleName: "Very low",
    name: "LOWEST",
    Icon: () => {},
  },
];

export const ticketTypesMapper = [
  {
    visibleName: "Ghost Cars",
    name: "GHOSTCARS",
  },
  {
    visibleName: "No metrics",
    name: "NO_METRICS",
  },
  {
    visibleName: "MDB-error",
    name: "MDB_ERROR",
  },
  {
    visibleName: "Cameras position issue",
    name: "CAMERA_POSITION",
  },
  {
    visibleName: "Camera is up/down",
    name: "CAMERA_IS_UP_DOWN",
  },
  {
    visibleName: "No dashboard",
    name: "NO_DASHBORD",
  },
  {
    visibleName: "VMS change",
    name: "VMS_CHANGE",
  },
  {
    visibleName: "Server restart",
    name: "SERVER_RESTART",
  },
  {
    visibleName: "Dashboard latency",
    name: "DASHBORD_LATENCY",
  },
  {
    visibleName: "Other",
    name: "OTHER_TYPE",
  },
];
