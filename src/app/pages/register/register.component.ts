import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
  isUserAgeBetweenEighteenAndNinety,
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
  isViewPortAtLeastMedium: boolean = false;
  // gender select element options
  genderOptions = [
    { name: 'Unknown', value: 'unknown' },
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ];
  // steps component
  items: MenuItem[] | undefined = [
    {
      label: 'Credentials',
    },
    {
      label: 'Personal',
    },

    {
      label: 'Agreement',
    },
  ];

  // adjust previous&next buttons depending on viewport width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  constructor(private messageService: MessageService) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  // show error toast function
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  // form validation
  handleNext() {
    // first step validation
    if (this.activeIndex === 0) {
      if (!isEmailValid(this.email)) {
        this.showError('Please use a valid email address');
        return;
      }
      if (this.username.length < 6) {
        this.showError('Your username must be at least 6 characters long');
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
      if (this.firstName.length < 2 || this.lastName.length < 2) {
        this.showError(
          'First name and last name must be at least 2 characters long'
        );
        return;
      }
      if (
        !this.birthDate ||
        !isUserAgeBetweenEighteenAndNinety(this.birthDate)
      ) {
        this.showError(
          'You must be between 18 and 90 years old in order to register'
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

  onSubmit() {
    const obj = {
      email: this.email,
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender: this.gender,
    };
  }
  // ! #TODO: after registration, user will go to homepage
  // ! #TODO: user can reset its password
  // ! #TODO: add 'already have an account?'
  // ? ASK: why does resetting password must include delete all user data
}
