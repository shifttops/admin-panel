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

export const filtersRequestMapper = [
  {
    name: 'date_created',
    reqName: 'date_created__range',
  },
  {
    name: 'date_deployment',
    reqName: 'date_deployment__range',
  },
  {
    name: 'view_name',
    reqName: 'cameras__view_name'
  },
  {
    name: 'machine_os',
    reqName: 'servers__machine_os'
  },
  {
    name: 'docker_version',
    reqName: 'servers__docker_version'
  },
  {
    name: 'machine_os',
    reqName: 'servers__machine_os'
  },
  {
    name: 'machine_os',
    reqName: 'servers__machine_os'
  },
  {
    name: 'nvidia_driver_version',
    reqName: 'servers__nvidia_driver_version'
  },
  {
    name: 'internet_speed',
    reqName: 'servers__internet_speed__range'
  },
]

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
      name: 'store_type',
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
      visibleName: 'Status',
      name: 'status',
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