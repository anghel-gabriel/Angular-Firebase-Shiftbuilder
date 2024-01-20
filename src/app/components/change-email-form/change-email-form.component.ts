import {Component} from '@angular/core';
import {isEmailValid} from '../../utils/validation';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.scss'
})
export class ChangeEmailFormComponent {
  authCurrentEmail = '';
  currentEmail = '';
  newEmail = '';
  newEmailConfirm = '';

  showError(message: string) {
    console.log(message);
  }

  onSubmit() {
    if (!isEmailValid(this.currentEmail) || !isEmailValid(this.newEmail) || !isEmailValid(this.newEmailConfirm)) {
      this.showError('You must enter valid email addresses.');
      return;
    }
    if (this.currentEmail === this.newEmail) {
      this.showError('You must set a new email.');
      return;
    }
    if (this.newEmail !== this.newEmailConfirm) {
      this.showError('Please confirm your new email.');
      return;
    }
    if (this.authCurrentEmail !== this.currentEmail) {
      this.showError('You entered a wrong current email.');
      return;
    }
    // change email
  }
}
