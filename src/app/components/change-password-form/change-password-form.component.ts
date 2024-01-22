import {Component} from '@angular/core';
import {isEmailValid, isPasswordValid} from '../../utils/validation';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  authCurrentPassword = '';
  currentPassword = '';
  newPassword = '';
  newPasswordConfirm = '';

  showError(message: string) {
    console.log(message);
  }

  onSubmit() {
    if (!isPasswordValid(this.currentPassword) || !isPasswordValid(this.newPassword) || !isPasswordValid(this.newPasswordConfirm)) {
      this.showError('You must enter valid password addresses.');
      return;
    }
    if (this.currentPassword === this.newPassword) {
      this.showError('You must set a new password.');
      return;
    }
    if (this.newPassword !== this.newPasswordConfirm) {
      this.showError('Please confirm your new password.');
      return;
    }
    if (this.authCurrentPassword !== this.currentPassword) {
      this.showError('You entered a wrong current password.');
      return;
    }
    // change email
  }
}
