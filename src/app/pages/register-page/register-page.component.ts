import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
  isUserAgeBetweenEighteenAndNinety,
} from '../../utils/validation';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [MessageService],
})
export class RegisterPageComponent {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  birthDate: string = '';
  gender: any = '';
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

  constructor(
    private messageService: MessageService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  // adjust previous&next buttons depending on viewport width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  // show error toast function
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
      summary: 'Error',
    });
  }

  // form validation on pressing next
  async handleNext() {
    // first step validation
    if (this.activeIndex === 0) {
      if (!isEmailValid(this.email)) {
        this.showError('Please use a valid email address');
        return;
      }
      if (this.username.length < 6) {
        this.showError('Your username must be at least 6 characters long');
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

      if (this.activeIndex === 0) {
        if (!isEmailValid(this.email)) {
          this.showError('Please use a valid email address');
          return;
        }
        if (this.username.length < 6) {
          this.showError('Your username must be at least 6 characters long');
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
        // check if the username is available
        this.isLoading = true;
        const isUsernameAvailable = await this.auth.isUsernameAvailable(
          this.username
        );
        const isEmailAvailable = await this.auth.isEmailAvailable(this.email);

        this.isLoading = false;
        if (!isUsernameAvailable) {
          this.showError(
            'This username is already taken. Please choose another one.'
          );
          return;
        }
        if (!isEmailAvailable) {
          this.showError(
            'This email address is already already in use. Please choose another one.'
          );
          return;
        }
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

  async onSubmit() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Loading',
      detail: 'Registration process in progress. Please wait...',
    });
    this.isLoading = true;
    const newUserData = {
      email: this.email,
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: new Date(this.birthDate).toISOString(),
      gender: this.gender || { name: 'Unknown', value: 'unknown' },
    };
    try {
      await this.auth.register(newUserData);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail:
          'You have successfully registered. You will be redirected to Shifts page.',
      });
      // adding a delay before redirecting user to have enough time to read the notifications
      await new Promise((resolve) => setTimeout(resolve, 4000));
      this.router.navigate(['/shifts']);
    } catch (error: any) {
      if (error.message.includes('auth/email-already-in-use')) {
        this.showError(
          'This email address is already in use. Please choose another one.'
        );
      } else {
        // TODO: handle disabled/deleted user or other errors
        this.showError('Registration failed. Please contact an admin.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  // TODO: fix birthdate
  // TODO: after registration, user will go to homepage
}
