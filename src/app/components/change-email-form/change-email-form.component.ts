import { Component, EventEmitter, Output } from "@angular/core";
import { isEmailValid } from "../../utils/validation";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-email-form",
  templateUrl: "./change-email-form.component.html",
  styleUrl: "./change-email-form.component.scss",
})
export class ChangeEmailFormComponent {
  @Output() errorEvent = new EventEmitter<string>();
  @Output() successEvent = new EventEmitter<string>();
  @Output() setLoadingSpinner = new EventEmitter<boolean>();
  @Output() closeForm = new EventEmitter();

  newEmail = "";
  newEmailConfirm = "";

  constructor(private auth: AuthenticationService) {}

  async onSubmit() {
    this.setLoadingSpinner.emit(true);
    if (!isEmailValid(this.newEmail)) {
      this.errorEvent.emit("You must enter valid email addresses.");
      return;
    }
    if (this.newEmail !== this.newEmailConfirm) {
      this.errorEvent.emit("Please confirm your new email.");
      return;
    }
    try {
      const isEmailAddressAvailable = this.auth.isEmailAddressAvailable(
        this.newEmail,
      );
      if (!isEmailAddressAvailable) {
        this.errorEvent.emit(
          "The new email address is unavailable. Please choose another one.",
        );
      }
      this.closeForm.emit();

      await this.auth.changeEmail(this.newEmail);
      this.successEvent.emit("Email address changed successfully.");
    } catch (error: any) {
      this.errorEvent.emit(
        "An error has occured while changing email address. Please try again.",
      );
    } finally {
      this.setLoadingSpinner.emit(false);
    }
  }
}
