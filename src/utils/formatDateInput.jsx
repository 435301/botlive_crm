export const formatToInputDate = (date) => {
  if (!date) return "";
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};