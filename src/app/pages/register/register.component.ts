import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  items: MenuItem[] | undefined = [
    {
      label: 'Credentials',
    },
    {
      label: 'Personal',
    },

    {
      label: 'Confirmation',
    },
  ];
  inputone: string = '';
  inputtwo: number | null = null;
  inputthree: string = '';
  value = '';
  activeIndex: number = 0;
  sex = '';

  options = [
    { name: 'Unknown', value: 'unknown' },
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ];

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
}
