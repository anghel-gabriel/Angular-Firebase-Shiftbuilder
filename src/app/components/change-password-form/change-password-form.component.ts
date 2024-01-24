import {Component} from '@angular/core';
import {isEmailValid, isPasswordValid} from '../../utils/validation';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  newPassword = '';
  newPasswordConfirm = '';

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  async onSubmit() {
    if (!isPasswordValid(this.newPassword)) {
      console.log('You must enter valid passwords.');
      return;
    }
    if (this.newPassword !== this.newPasswordConfirm) {
      console.log('Please confirm your new password.');
      return;
    }

    try {
      await this.auth.changePassword(this.newPassword);
      this.auth.logOut();
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.log(error);
    }
  }
}
