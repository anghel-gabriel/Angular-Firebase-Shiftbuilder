import {Component} from '@angular/core';
import {isDateBefore} from 'src/app/utils/validation';
import {Message} from 'primeng/api';
import {ShiftsService} from '../../services/shifts.service';
import {calculateProfit} from '../../utils/computation';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  workTime: any;
  hourlyWage: any;
  workplace: any;
  comments: any;
  messages: Message[] = [];
  workplaces = [
    {
      label: 'Frontend', value: 'Frontend'
    }

    // {
    //   label: 'Backend',
    //   value: {
    //     name: 'Backend',
    //     imgUrl: '../../../assets/backend.png'
    //   }
    // },
    // {label: 'Fullstack', value: {name: 'Fullstack', imgUrl: '../../../assets/fullstack.svg'}},
    // {label: 'Data Analyst', value: {name: 'Data Analyst', imgUrl: '../../../assets/data-analyst.png'}},
    // {label: 'SQL', value: {name: 'SQL', imgUrl: '../../../assets/sql.png'}}
  ];

  constructor(private db: ShiftsService) {
  }

  showError(message: string) {
    this.messages = [...this.messages, {
      severity: 'error',
      detail: message,
    }];
  }

  async onSubmit() {
    this.messages = [];
    if (!this.workTime || !Array.isArray(this.workTime) || this.workTime.length < 2) {
      this.showError('Start time and end time are mandatory.');
      return;
    }

    const [startTime, endTime] = this.workTime;

    if (!startTime || !endTime || !isDateBefore(startTime, endTime)) {
      this.showError('The start time must be before the end time.');
      return;
    }

    if (!this.hourlyWage || this.hourlyWage <= 0) {
      this.showError('Hourly wage must be over 0.');
      return;
    }

    if (!this.workplace) {
      this.showError('You must select a workplace.');
      return;
    }

    const shift = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      hourlyWage: parseFloat(this.hourlyWage),
      workplace: this.workplace,
      comments: this.comments,
      profit: calculateProfit(startTime, endTime, this.hourlyWage)
    };

    await this.db.addShift(shift);
  }
}
