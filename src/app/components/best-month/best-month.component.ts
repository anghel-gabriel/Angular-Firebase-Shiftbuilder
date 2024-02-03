import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { getBestMonthStats } from 'src/app/utils/computation';

@Component({
  selector: 'app-best-month',
  templateUrl: './best-month.component.html',
  styleUrl: './best-month.component.scss',
})
export class BestMonthComponent {
  bestMonthStats = {
    month: 'No stats',
    year: 'No stats',
    hoursWorked: 'No stats',
    averageHourlyWage: 'No stats',
    profit: 'No stats',
  };
  constructor(
    private auth: AuthenticationService,
    private db: DatabaseService
  ) {
    this.db.updateShifts().subscribe((shifts) => {
      this.bestMonthStats = getBestMonthStats(shifts);
    });
  }
}
