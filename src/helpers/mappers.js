import styles from "../components/buttons/Button/button.module.scss";
export const statusMapper = [
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
