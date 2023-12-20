import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  stateOptions: any[] = [
    { label: 'Sign in with email', value: 'Email address', disabled: true },
    { label: 'Sign in with username', value: 'Username', disabled: false },
  ];

  loginWay: string = 'Email address';

  onSelectChange(): void {
    // Prevent unselecting if the option is already disabled
    if (
      this.stateOptions.find(
        (option) => option.value === this.loginWay && option.disabled
      )
    ) {
      return;
    }

    // Update the options to disable the selected one
    this.stateOptions = this.stateOptions.map((option) => ({
      ...option,
      disabled: option.value === this.loginWay,
    }));
  }
}
