import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShiftsService } from 'src/app/services/shifts.service';
import { getBestMonthStats } from 'src/app/utils/computation';

@Component({
  selector: 'app-best-month',
  templateUrl: './best-month.component.html',
  styleUrl: './best-month.component.scss',
})
export class BestMonthComponent {
  bestMonthStats: any;
  constructor(private auth: AuthenticationService, private db: ShiftsService) {
    this.db.getShiftsChanges().subscribe((shifts) => {
      this.bestMonthStats = getBestMonthStats(shifts);
      console.log(this.bestMonthStats);
    });
  }
}
