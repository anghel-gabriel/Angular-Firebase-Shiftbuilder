interface MonthlyStat {
  year: number;
  month: number;
  profit: number;
  hoursWorked: number;
  totalWage: number;
  count: number;
}

export function calculateProfit(
  startTime: Date,
  endTime: Date,
  hourlyWage: number
): number {
  const timeDifference = endTime.getTime() - startTime.getTime();
  const workedHours = timeDifference / (1000 * 60 * 60);
  return hourlyWage * workedHours;
}

// ! #TODO: get only best month by my shifts (currently it takes shifts from all users)
export function getBestMonthStats(shifts: any): any {
  const parseShifts = (shift: any) => {
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);
    const hoursWorked =
      (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
    return {
      year: startTime.getFullYear(),
      month: startTime.getMonth(),
      profit: shift.profit,
      hoursWorked: hoursWorked,
      hourlyWage: shift.hourlyWage,
    };
  };

  const monthlyStats: Record<string, MonthlyStat> = shifts
    .map(parseShifts)
    .reduce((acc: Record<string, MonthlyStat>, shift: any) => {
      const monthKey = `${shift.year}-${shift.month}`;
      if (!acc[monthKey]) {
        acc[monthKey] = {
          year: shift.year,
          month: shift.month,
          profit: 0,
          hoursWorked: 0,
          totalWage: 0,
          count: 0,
        };
      }
      acc[monthKey].profit += shift.profit;
      acc[monthKey].hoursWorked += shift.hoursWorked;
      acc[monthKey].totalWage += shift.hoursWorked * shift.hourlyWage;
      acc[monthKey].count++;
      return acc;
    }, {});

  let bestMonth = null;
  let bestMonthStats = {
    year: 0,
    month: '',
    profit: 0,
    hoursWorked: 0,
    averageHourlyWage: 0,
  };
  for (const [key, stats] of Object.entries(monthlyStats)) {
    if (bestMonth === null || stats.profit > bestMonthStats.profit) {
      bestMonth = key;
      bestMonthStats = {
        year: stats.year,
        month: new Date(0, stats.month).toLocaleString('default', {
          month: 'long',
        }),
        profit: stats.profit,
        hoursWorked: stats.hoursWorked,
        averageHourlyWage: stats.totalWage / stats.hoursWorked,
      };
    }
  }

  return bestMonthStats;
}
