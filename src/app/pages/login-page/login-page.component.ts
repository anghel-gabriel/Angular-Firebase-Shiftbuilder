import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
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

  constructor(private auth: AuthenticationService) {
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

  async onSubmit() {
    try {
      await this.auth.signIn(this.loginEmailOrUsername, this.password);
    } catch (error) {
      console.log(error);
    }
  }
}

// TODO: ask: The user will be asked to put user information that will be saved via the server for 60 minutes
