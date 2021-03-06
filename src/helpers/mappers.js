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
    visibleName: "Работает",
    name: "Работает",
    className: styles.deployed,
    class: "deployed",
  },
  {
    visibleName: "Конфигурация",
    name: "Конфигурация",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Установка",
    name: "Установка",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Тест",
    name: "Тест",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "На обслуживании",
    name: "На обслуживании",
    className: styles.test,
    class: "test",
  },
  {
    visibleName: "Готов к установке",
    name: "Готов к установке",
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
    visibleName: "Страна",
    name: "country",
  },
  {
    visibleName: "Регион",
    name: "county",
  },
  {
    visibleName: "Адрес",
    name: "address",
  },
  {
    visibleName: "Почтовый индекс",
    name: "zipcode",
  },
  {
    visibleName: "Тип АЗС",
    name: "store_type",
  },
  {
    visibleName: "Дата запуска",
    name: "dod",
  },
  {
    visibleName: "Дата установкм",
    name: "rfd",
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
    label: "Новые АЗС",
    field: "new_stores",
  },
  {
    label: "Изменение статуса АЗС",
    field: "store_status_change",
  },
  {
    label: "Новые сообщения в чатах АЗС",
    field: "new_messages",
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
    className: stylesTickets.yellow,
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
    title: "Reason",
    field: "reason",
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

export const ticketReasonMapper = [
  {
    name: "WIS_HARDWARE",
    visibleName: "Wis Hardware",
    className: stylesTickets.blue,
  },
  {
    name: "SOFTWARE",
    visibleName: "Software",
    className: stylesTickets.yellow,
  },
  {
    name: "OTHER",
    visibleName: "Other",
    className: stylesTickets.red,
  },
];

export const ticketsStatsChartsMapper = [
  {
    mapper: ticketReasonMapper,
    title: "Number of tickets by classification",
    type: "vertical",
    field: "reason",
  },
  {
    mapper: ticketStatusMapper,
    title: "Number of tickets by status",
    type: "vertical",
    field: "status",
  },
  {
    mapper: ticketTypesMapper.slice(0, -1),
    title: "Number of tickets by topic",
    type: "horizontal",
    field: "type",
  },
];

export const ticketsStatsTablesMapper = [
  {
    title: "Total tickets",
    mapper: ticketReasonMapper,
    types: ticketTypesMapper.map((item) => item.name),
    field: "reason",
  },
  {
    title: "Total ghost cars tickets",
    mapper: ticketStatusMapper,
    types: ["GHOSTCARS"],
    field: "status",
  },
  {
    title: "Total algorythm/dashboard problem tickets",
    mapper: ticketStatusMapper,
    types: ["NO_METRICS", "NO_DASHBORD", "DASHBORD_LATENCY"],
    field: "status",
  },
  {
    title:
      "Total VMS restarted tickets (request to restard dashboard)/Servers changed",
    mapper: ticketStatusMapper,
    types: ["VMS_CHANGE", "SERVER_RESTART"],
    field: "status",
  },
  {
    title: "Total camera problem tickets",
    mapper: ticketStatusMapper,
    types: ["CAMERA_IS_UP_DOWN", "CAMERA_POSITION"],
    field: "status",
  },
];

export const ticketsStatsPdfTableMapper = [
  {
    name: "id",
    visibleName: "Key",
  },
  {
    name: "name",
    visibleName: "Summary",
  },
  {
    name: "user",
    visibleName: "Reporter",
  },
  {
    name: "first_response_time",
    visibleName: "Created",
  },
  {
    name: "stores",
    visibleName: "Stores",
  },
  {
    name: "status",
    visibleName: "Status",
  },
  {
    name: "reason",
    visibleName: "Reason",
  },
  {
    name: "type",
    visibleName: "Type",
  },
];

export const ticketsTableItems = [
  {
    visibleName: "Type",
    key: "type",
  },
  {
    visibleName: "Key",
    key: "id",
  },
  {
    visibleName: "Summary",
    key: "name",
  },
  {
    visibleName: "Reporter",
    key: "user",
  },
  {
    visibleName: "Assignee",
    key: "assignee",
  },
  {
    visibleName: "Status",
    key: "status",
  },
  {
    visibleName: "Reason",
    key: "reason",
  },
  {
    visibleName: "Created",
    key: "first_response_time",
  },
];

export const storeCamerasMapper = [
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
