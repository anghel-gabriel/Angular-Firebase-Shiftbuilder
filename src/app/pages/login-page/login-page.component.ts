import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService],
})
export class LoginPageComponent {
  isLoading = false;
  loginEmailOrUsername = '';
  password = '';
  loginWay: string = 'email';
  desktopSelectOptions: any[] = [
    {
      label: 'Sign in with email',
      value: 'email',
      disabled: true,
    },
    {
      label: 'Sign in with username',
      value: 'username',
      disabled: false,
    },
  ];
  mobileSelectOptions = [
    {label: 'Sign in with email', value: 'email'},
    {label: 'Sign in with username', value: 'username'},
  ];

  constructor(
    private auth: AuthenticationService,
    private toast: MessageService,
    private router: Router
  ) {
  }

  onDesktopSelectChange(): void {
    // prevent unselecting both login ways
    const isAlreadySelected = this.desktopSelectOptions.find(
      (option) => option.value === this.loginWay && option.disabled
    );
    if (isAlreadySelected) return;
    // update the options to disable the selected one
    this.desktopSelectOptions = this.desktopSelectOptions.map((option) => ({
      ...option,
      disabled: option.value === this.loginWay,
    }));
  }

  showError(message: string) {
    this.toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  async onSubmit() {
    if (!this.password || !this.loginEmailOrUsername) {
      this.showError('Please enter your login credentials.');
      return;
    }

    try {
      this.isLoading = true;
      await this.auth.signIn(this.loginEmailOrUsername, this.password);
      this.router.navigate(['/shifts']);
    } catch (error: any) {
      console.log(error.message);
      // invalid credentials error
      switch (error.message) {
        case 'FirebaseError: Firebase: Error (auth/invalid-email).':
          this.showError(
            'Invalid email address. Please check the entered data and try again.'
          );
          return;
          break;
        case 'FirebaseError: Firebase: Error (auth/invalid-credential).':
        case 'FirebaseError: Firebase: Error (auth/user-not-found).':
          this.showError(
            'Invalid credentials. Please check the entered data and try again.'
          );
          return;
          break;
        default:
          this.showError(
            'An error has occured. Please try again.'
          );
          break;
      }
    } finally {
      this.isLoading = false;
    }
  }
}

// TODO: handle username login
// TODO: ask: The user will be asked to put user information that will be saved via the server for 60 minutes / token expiration
