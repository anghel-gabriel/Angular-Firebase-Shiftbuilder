import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss'],
})
export class AdminStatsComponent {
  options = {};
  data = {};
  allShifts: any[] = [];
  currentChart = 'profit';
  isChartShowing = false;
  dropdownOptions = [
    { name: 'Select an option', code: 'none' },
    { name: 'Total Profit per Month', code: 'profitMonth' },
    { name: 'Total Profit per Workplace', code: 'profit' },
    { name: 'Total Profit per Employee', code: 'profitAuthor' },
    { name: 'Worked Hours per Month', code: 'hoursMonth' },
    { name: 'Worked Hours per Workplace', code: 'hoursWorkplace' },
    { name: 'Worked Hours per Employee', code: 'hoursAuthor' },
  ];

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService
  ) {
    this.db.updateShifts().subscribe((shifts) => {
      this.allShifts = shifts;
    });
  }

  onChartChange(event: any): void {
    this.currentChart = event.value.code;
    this.currentChart === 'none'
      ? (this.isChartShowing = false)
      : (this.isChartShowing = true);
    switch (this.currentChart) {
      case 'profit':
        this.updateChartData(this.allShifts);
        break;
      case 'hoursWorkplace':
        this.updateHoursWorkplaceChart(this.allShifts);
        break;
      case 'hoursAuthor':
        this.updateHoursAuthorChart(this.allShifts);
        break;
      case 'profitAuthor':
        this.updateProfitAuthorChart(this.allShifts);
        break;
      case 'hoursMonth':
        this.updateHoursPerMonthChart(this.allShifts);
        break;
      case 'profitMonth':
        this.updateProfitPerMonthChart(this.allShifts);

        break;
      case 'none':
        this.data = {};
        break;
    }
  }

  updateChartData(shifts: any[]): void {
    const workplaceProfits = shifts.reduce((acc, shift) => {
      const { workplace, profit } = shift;
      acc[workplace] = (acc[workplace] || 0) + profit;
      return acc;
    }, {});

    this.setChartData(workplaceProfits, 'Profit by Workplace');
  }

  updateHoursWorkplaceChart(shifts: any[]): void {
    const workplaceHours = shifts.reduce((acc, shift) => {
      const { workplace, startTime, endTime } = shift;
      const hours = this.getHours(startTime, endTime);
      acc[workplace] = (acc[workplace] || 0) + hours;
      return acc;
    }, {});

    this.setChartData(workplaceHours, 'Hours Worked by Workplace');
  }

  updateHoursAuthorChart(shifts: any[]): void {
    const authorHours = shifts.reduce((acc, shift) => {
      const { authorFullName, startTime, endTime } = shift;
      const hours = this.getHours(startTime, endTime);
      acc[authorFullName] = (acc[authorFullName] || 0) + hours;
      return acc;
    }, {});

    this.setChartData(authorHours, 'Hours Worked by Author');
  }

  updateProfitAuthorChart(shifts: any[]): void {
    const authorProfits = shifts.reduce((acc, shift) => {
      const { authorFullName, profit } = shift;
      acc[authorFullName] = (acc[authorFullName] || 0) + profit;
      return acc;
    }, {});

    this.setChartData(authorProfits, 'Profit by Author');
  }

  updateHoursPerMonthChart(shifts: any[]): void {
    const monthlyHours = shifts.reduce((acc, shift) => {
      const month = new Date(shift.startTime).toLocaleString('default', {
        month: 'long',
      });
      const hours = this.getHours(shift.startTime, shift.endTime);
      acc[month] = (acc[month] || 0) + hours;
      return acc;
    }, {});

    this.setChartData(monthlyHours, 'Worked Hours per Month');
  }

  updateProfitPerMonthChart(shifts: any[]): void {
    const monthlyProfits = shifts.reduce((acc, shift) => {
      const month = new Date(shift.startTime).toLocaleString('default', {
        month: 'long',
      });
      acc[month] = (acc[month] || 0) + shift.profit;
      return acc;
    }, {});

    this.setChartData(monthlyProfits, 'Total Profit per Month');
  }

  setChartData(dataObject: { [key: string]: number }, label: string): void {
    const labels = Object.keys(dataObject);
    const data = Object.values(dataObject);

    this.data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#E55376',
            '#2A91D8',
            '#E6B84D',
            '#419DAF',
            '#8755E0',
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
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

  getHours(startTime: string, endTime: string): number {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }
}
