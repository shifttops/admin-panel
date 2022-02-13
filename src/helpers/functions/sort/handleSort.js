export const handleSort = ({ sortTypes, field, sort, setSort }) => {
  if (sort.field === field) {
    setSort({
      field,
      type: sortTypes[(sortTypes.indexOf(sort.type) + 1) % sortTypes.length],
    });
  } else {
    setSort({ field, type: sortTypes[1] });
  }
};
