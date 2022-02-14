export const getTicketTypeCount = ({ types, name, field, tickets }) =>
  tickets.filter(
    (ticket) => types.includes(ticket.type) && ticket[field] === name
  ).length;
