import {Component} from '@angular/core';
import {isEmailValid} from '../../utils/validation';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.scss'
})
export class ChangeEmailFormComponent {
  newEmail = '';
  newEmailConfirm = '';

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  async onSubmit() {
    if (!isEmailValid(this.newEmail)) {
      console.log('You must enter valid email addresses.');
      return;
    }
    if (this.newEmail !== this.newEmailConfirm) {
      console.log('Please confirm your new email.');
      return;
    }
    try {
      await this.auth.changeEmail(this.newEmail);
      await this.auth.logOut();
      this.router.navigate(['/sign-in']);
    } catch (error: any) {
      console.log(error);
    }

    // change email
  }
}
