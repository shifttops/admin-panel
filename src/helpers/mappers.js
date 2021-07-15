import styles from '../components/buttons/Button/button.module.scss'
export const statusMapper = [
  {
    visibleName: "Store Deployed",
    name: "W",
    className: styles.deployed,
  },
  {
    visibleName: "Hardware issues",
    name: "B",
    className: styles.maintenance,
  },
  {
    visibleName: "Configuring",
    name: "C",
    className: styles.configuration,
  },
  {
    visibleName: "Ready for Deployment",
    name: "R",
    className: styles.ready,
  },
  {
    visibleName: "Store Testing",
    name: "T",
    className: styles.test,
  },
  {
    visibleName: "Software Issues",
    name: "M",
    className: styles.maintenance,
  },
];

export const categoryMapper = [
    {
      visibleName: 'Country',
      name: 'country',
    },
    {
      visibleName: 'State',
      name: 'state',
    },
    {
      visibleName: 'Region',
      name: 'county',
    },
    {
      visibleName: 'Location',
      name: 'address',
    },
    {
      visibleName: 'ZipCode',
      name: 'zipcode',
    },
    {
      visibleName: 'Store type',
      name: 'type',
    },
    {
      visibleName: 'Building type',
      name: 'building',
    },
    {
      visibleName: 'Number of drive zone',
      name: 'driveZones',
    },
    {
      visibleName: 'Date of deployment',
      name: 'dod',
    },
    {
      visibleName: 'Ready for deployment date',
      name: 'rfd',
    },
    {
    visibleName: 'fourDigitRestaurantID',
    name: 'fourDigitRestaurantID',
  },
  {
    visibleName: 'threeDigitRestaurantID',
    name: 'threeDigitRestaurantID',
  },
  ];


  export const filtersMapper = [
    {
      visibleName: 'RFDD',
      name: 'date_created',
    },
    {
      visibleName: 'DOD',
      name: 'date_deployment',
    },
    {
      visibleName: 'Docker version',
      name: 'docker_version',
    },
    {
      visibleName: 'Internet speed',
      name: 'internet_speed',
    },
    {
      visibleName: 'OS',
      name: 'machine_os',
    },
    {
      visibleName: 'Nvidia driver',
      name: 'nvidia_driver_version',
    },
    {
      visibleName: 'Statuses',
      name: 'statuses',
    },
    {
      visibleName: 'Cameras',
      name: 'view_name',
    },
    {
      visibleName: 'Store type',
      name: 'store_type',
    }
  ]