import {Component, HostListener} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {
  isEmailValid,
  isPasswordValid,
  isUsernameValid,
  isUserAgeBetweenEighteenAndNinety,
} from '../../utils/validation';
import {AuthenticationService} from '../../services/authentication.service';
import {UserInterface} from '../../utils/interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [MessageService],
})

export class ProfilePageComponent {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  birthDate: any;
  gender: string | { name: string; value: string } = '';
  activeIndex = 0;
  checked = false;
  isLoading = false;
  isViewPortAtLeastMedium: boolean = false;
  // gender select element options

  isChangingPasswordModalVisible = false;
  isChangingEmailModalVisible = false;

  genderOptions = [
    {name: 'Unknown', value: 'unknown'},
    {name: 'Male', value: 'male'},
    {name: 'Female', value: 'female'},
    {name: 'Other', value: 'other'},
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

  constructor(private messageService: MessageService, private auth: AuthenticationService) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
    this.auth.getLoggedUser().subscribe((data: any) => this.fillProfileFields(data));
  }

  // adjust previous&next buttons depending on viewport width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  fillProfileFields(data: UserInterface) {
    if (data) {
      this.username = data.email;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.username = data.username;
      this.birthDate = new Date(data.birthDate);
      this.gender = data.gender || {name: 'Unknown', value: 'unknown'};
    }

  }

  // show error toast function
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
    });
  }

  // form validation
  handleSaveProfile() {
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
    if (this.firstName.length < 2 || this.lastName.length < 2) {
      this.showError(
        'First name and last name must be at least 2 characters long'
      );
      return;
    }
    if (
      !this.birthDate ||
      !isUserAgeBetweenEighteenAndNinety(new Date(this.birthDate))
    ) {
      this.showError(
        'You must be between 18 and 90 years old in order to register'
      );
      return;
    }

  }


  onUpload(event: any) {
    console.log(event);
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
