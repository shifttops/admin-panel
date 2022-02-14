export const configureTicketsStatsChartData = (mapper, field, ticketsData) =>
  mapper
    .map(({ name }) => {
      let count = 0;
      ticketsData.map((ticket) => {
        if (ticket[field] === name) count++;
      });

      return { name, count };
    })
    .filter(({ count }) => !!count);
