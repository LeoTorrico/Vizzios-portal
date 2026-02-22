export const formatDecimalToHHMM = (decimalHours: number): string => {
  if (
    decimalHours === undefined ||
    decimalHours === null ||
    isNaN(decimalHours)
  ) {
    return "00:00 hrs";
  }

  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");

  return `${hoursStr}:${minutesStr} hrs`;
};
