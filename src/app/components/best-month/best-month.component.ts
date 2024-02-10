import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { getBestMonthStats } from 'src/app/utils/computation';

@Component({
  selector: 'app-best-month',
  templateUrl: './best-month.component.html',
  styleUrls: ['./best-month.component.scss'],
})
export class BestMonthComponent {
  bestMonthStats = {
    month: 'No stats',
    year: 'No stats',
    hoursWorked: 'No stats',
    averageHourlyWage: 'No stats',
    profit: 'No stats',
  };

  data = {};
  options = {};

  constructor(
    private auth: AuthenticationService,
    private db: DatabaseService
  ) {
    this.db.updateShifts().subscribe((shifts) => {
      const currentId = this.auth?.getAuthUser()?.uid;
      const myShifts = shifts.filter(
        (shift: any) => shift.author === currentId
      );
      this.bestMonthStats = getBestMonthStats(myShifts);
      this.updateChartData(myShifts);
    });
  }

  updateChartData(shifts: any[]): void {
    const workplaceProfits = shifts.reduce((acc, shift) => {
      const { workplace, profit } = shift;
      acc[workplace] = (acc[workplace] || 0) + profit;
      return acc;
    }, {});

    const workplaces = Object.keys(workplaceProfits);
    const profits = Object.values(workplaceProfits);

    this.data = {
      labels: workplaces,
      datasets: [
        {
          data: profits,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            color: '#555',
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }
}
