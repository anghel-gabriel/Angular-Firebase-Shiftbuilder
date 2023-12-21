import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  items: MenuItem[] | undefined = [
    {
      label: 'Login credentials',
    },
    {
      label: 'Personal information',
    },

    {
      label: 'Agreement',
    },
  ];

  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  birthDate = '';
  gender = '';
  activeIndex = 0;
  checked = false;
  isLoading = true;

  handleNext() {
    if (this.activeIndex !== 2) this.activeIndex++;
  }

  handlePrevious() {
    if (this.activeIndex !== 0) this.activeIndex--;
  }

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
