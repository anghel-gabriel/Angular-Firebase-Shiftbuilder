import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
  isUserEighteenYearsAgo,
} from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
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
  isLoading = false;
  genderOptions = [
    { name: 'Unknown', value: 'unknown' },
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ];

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

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  handleNext() {
    // first step validation
    if (this.activeIndex === 0) {
      if (!isEmailValid(this.email)) {
        this.showError('Please use a valid email address');
        return;
      }
      if (!isUsernameValid(this.username)) {
        this.showError('Your username must be alphanumeric');
        return;
      }
      if (!isPasswordValid(this.password)) {
        this.showError('Your password must respect the requested format');
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.showError('Your passwords must match');
        return;
      }
    }
    // second step validation
    if (this.activeIndex === 1) {
      if (this.firstName.length < 6 || this.lastName.length < 6) {
        this.showError(
          'First name and last name must be at least 6 characters long'
        );
        return;
      }
      if (!this.birthDate || !isUserEighteenYearsAgo(this.birthDate)) {
        this.showError(
          'You must be at least 18 years old in order to register'
        );
        return;
      }
    }

    if (this.activeIndex !== 2) this.activeIndex++;
  }

  handlePrevious() {
    if (this.activeIndex !== 0) this.activeIndex--;
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
}
