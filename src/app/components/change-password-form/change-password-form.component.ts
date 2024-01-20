import {Component} from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  authPassword = '';
  newPassword = '';
  newPasswordConfirm = '';

  onSubmit() {
  }
}
