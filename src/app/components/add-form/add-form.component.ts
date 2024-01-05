import { Component } from '@angular/core';

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

  workplaces = [
    { label: 'Sign in with email', value: 'email' },
    { label: 'Sign in with username', value: 'username' },
  ];

  onSubmit() {
    // ! all fields -comments are mandatory
    // ! startTime should be before endTime
    const [startTime, endTime] = this.workTime;
    console.log(this.workTime);
  }
}
