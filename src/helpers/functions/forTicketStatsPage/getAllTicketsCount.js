export const getAllTicketsCount = (types, tickets) =>
  tickets.filter((ticket) => types.includes(ticket.type)).length;
