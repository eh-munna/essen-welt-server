export const convertToDayDate = (date, time) => {
  return new Date(`${date}T${time}:00.000Z`);
};
