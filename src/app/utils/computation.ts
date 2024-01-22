export function calculateProfit(startTime: any, endTime: any, hourlyWage: any) {
  const timeDifference = endTime.getTime() - startTime.getTime();
  const workedHours = timeDifference / (1000 * 60 * 60);
  return hourlyWage * workedHours;
}
