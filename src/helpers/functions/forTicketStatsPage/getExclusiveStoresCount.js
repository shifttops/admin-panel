export const getExclusiveStoresCount = (types, tickets) => {
  const res = [];
  tickets
    .filter((ticket) => types.includes(ticket.type))
    .map((item) => {
      item.stores.map((store) => res.push(store));
    });

  return [...new Set(res)].length;
};
