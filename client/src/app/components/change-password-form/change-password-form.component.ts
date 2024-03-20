import { Component, EventEmitter, Output } from "@angular/core";
import { isPasswordValid } from "../../utils/validation";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-change-password-form",
  templateUrl: "./change-password-form.component.html",
  styleUrl: "./change-password-form.component.scss",
})
export class ChangePasswordFormComponent {
  @Output() errorEvent = new EventEmitter<string>();
  @Output() successEvent = new EventEmitter<string>();
  @Output() setLoadingSpinner = new EventEmitter<boolean>();
  @Output() closeForm = new EventEmitter();
  newPassword = "";
  newPasswordConfirm = "";

  constructor(private auth: AuthenticationService) {}

  async onSubmit() {
    try {
      this.setLoadingSpinner.emit(true);
      if (!isPasswordValid(this.newPassword)) {
        this.errorEvent.emit("You must enter valid passwords.");
        return;
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.errorEvent.emit("Your passwords must match.");
        return;
      }
      this.closeForm.emit();
      await this.auth.changePassword(this.newPassword);
      this.successEvent.emit("Password changed succesfully.");
    } catch (error) {
      this.errorEvent.emit(
        "An error has occured while changing your password. Please reauthenticate and try again.",
      );
    } finally {
      this.setLoadingSpinner.emit(false);
    }
  }
}
