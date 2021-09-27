import { filtersRequestMapper } from "./mappers";

export const createDateFilters = (filters) => {
  Object.keys(filters).forEach((filterKey) => {
    const reqKey = filtersRequestMapper.find(
        (item) => filterKey === item.name
    )?.reqName;

    const key = reqKey || filterKey

    if (
        key === "date_deployment__range" ||
        key === "date_created__range"
    ) {
      const index = filters[key].findIndex((item) => !item);
      if (index === 1) {
        filters[key][index] = new Date().toISOString();
      } else {
        filters[key][index] = new Date(0).toISOString();
      }
    }
  });
  return filters;
};
