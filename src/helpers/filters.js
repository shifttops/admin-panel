import { filtersRequestMapper } from "./mappers";

export const createDateFilters = (filters) => {
  Object.keys(filters).forEach((filterKey) => {
    const reqKey = filtersRequestMapper.find(
        (item) => filterKey === item.name
    )?.reqName;

    const key = reqKey || filterKey

    if (
      filterKey === "date_deployment__range" ||
      filterKey === "date_created__range"
    ) {
      const index = filters[filterKey].findIndex((item) => !item);
      if (index === 1) {
        filters[filterKey][index] = new Date().toISOString();
      } else {
        filters[filterKey][index] = new Date(0).toISOString();
      }
    }
  });
  return filters;
};
