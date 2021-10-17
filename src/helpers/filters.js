import { filtersRequestMapper } from "./mappers";

export const createDateFilters = (filters) => {
  let tempFilters = Object.assign([], filters);

  Object.keys(tempFilters).forEach((filterKey) => {
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
        tempFilters[key][index] = new Date().toISOString();
      } else {
        tempFilters[key][index] = new Date(0).toISOString();
      }
    }
    else {
      if(reqKey) {
        tempFilters[reqKey] = tempFilters[filterKey]
        if(reqKey !== filterKey) delete tempFilters[filterKey]
      }
    }
  });
  return tempFilters;
};
