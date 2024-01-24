import {Component} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [MessageService]
})
export class ForgotPasswordComponent {
  email = '';
  isLoading = false;

  constructor(private auth: AuthenticationService, public toast: MessageService) {
  }

  async onSubmit() {
    try {
      this.isLoading = true;
      await this.auth.sendPasswordResetEmail(this.email);
    } catch (error: any) {
      this.toast.add({
        severity: 'error',
        summary: 'Invalid email address',
        detail: 'Provided email address is invalid. Please try again.',
      });
    } finally {
      this.isLoading = false;
    }
  }
}

//TODO: custom email template from Firebase
