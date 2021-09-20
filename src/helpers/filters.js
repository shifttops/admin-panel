import { filtersRequestMapper } from "./mappers";

export const createDateFilters = (filters) => {
    Object.keys(filters).forEach((filterKey) => {
      if(filterKey === 'date_deployment__range' || filterKey === "date_created__range"){
        const index = filters[filterKey].findIndex(item => !item);
        if(index===1){
          filters[filterKey][index] = new Date().toISOString();
        } else {
          filters[filterKey][index] = new Date(0).toISOString();
        }
      }
        // const dateFilterKey = filterKey.split("__lte")[0].split("__gte")[0];
        // if (
        //   filters[`${dateFilterKey}__lte`] &&
        //   filters[`${dateFilterKey}__gte`]
        //   ) {
        //     filters[`${dateFilterKey}__range`] = [
        //       filters[`${dateFilterKey}__gte`],
        //     filters[`${dateFilterKey}__lte`],
        //   ];
        //   delete filters[`${dateFilterKey}__lte`];
        //   delete filters[`${dateFilterKey}__gte`];

        // } else if (filters[`${dateFilterKey}__gte`]) {
        //   filters[`${dateFilterKey}__lte`] = new Date().toISOString();
        // } else if (filters[`${dateFilterKey}__lte`]) {
        //   filters[`${dateFilterKey}__gte`] = new Date().toISOString();
        // }

        // if (
        //     filters[`${dateFilterKey}__lte`] &&
        //     filters[`${dateFilterKey}__gte`]
        //   ) {
        //     filters[`${dateFilterKey}__range`] = [
        //       filters[`${dateFilterKey}__gte`],
        //       filters[`${dateFilterKey}__lte`],
        //     ];
        //     delete filters[`${dateFilterKey}__lte`];
        //     delete filters[`${dateFilterKey}__gte`];
  
        //   }
      });
      return filters;
}

export const configureFilters = (enabledFilters) => {
  let filtersForReq = {};

  Object.keys(enabledFilters).forEach((key) => {
    let reqKey = filtersRequestMapper.find(
        (item) => key === item.name
    )?.reqName;
    if (reqKey) {
      filtersForReq[reqKey] = enabledFilters[key];
    } else {
      filtersForReq[key] = enabledFilters[key];
    }
  });

  return createDateFilters(filtersForReq);
}