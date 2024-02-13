import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DatabaseService } from "src/app/services/database.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { defaultPhotoURL } from "src/app/utils/defaultProfileImage";
import { genderOptionList } from "src/app/utils/genderOptions";
import {
  isUserAgeBetween6And130,
  isUsernameValid,
} from "src/app/utils/validation";

@Component({
  selector: "app-employee-page",
  templateUrl: "./employee-page.component.html",
  styleUrl: "./employee-page.component.scss",
  providers: [MessageService],
})
export class EmployeePageComponent {
  defaultPhotoURL = defaultPhotoURL;
  isLoading = true;
  employeeId: any;
  // employeeData
  actualFirstName = "";
  actualLastName = "";
  actualUsername = "";
  firstName = "";
  lastName = "";
  username = "";
  email = "";
  birthDate: any;
  gender = "";
  photoURL = "";
  genderOptions = genderOptionList;
  isChangingPasswordModalVisible = false;
  isChangingEmailModalVisible = false;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private fileUpload: FileUploadService,
    private messageService: MessageService,
    private database: DatabaseService,
    private router: Router,
  ) {
    this.employeeId = this.route.snapshot.paramMap.get("employeeId");
    this.fillFieldsWithEmployeeData();
  }

  async fillFieldsWithEmployeeData() {
    try {
      const employeeData = await this.auth.getEmployeeData(this.employeeId);
      if (!employeeData || !employeeData["uid"]) this.router.navigate(["/404"]);
      else {
        this.firstName = employeeData["firstName"];
        this.lastName = employeeData["lastName"];
        this.actualUsername = employeeData["username"];
        this.username = employeeData["username"];
        this.email = employeeData["email"];
        this.gender = employeeData["gender"];
        this.photoURL = employeeData["photoURL"] || defaultPhotoURL;
        this.birthDate = new Date(employeeData["birthDate"]);
        this.actualFirstName = employeeData["firstName"];
        this.actualLastName = employeeData["lastName"];
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  // show error toast function
  showError(message: string) {
    this.messageService.add({
      severity: "error",
      detail: message,
      summary: "Error",
    });
  }

  // show success toast notification
  showSuccess(message: string) {
    this.messageService.add({
      severity: "success",
      detail: message,
      summary: "Success",
    });
  }

  async removePhoto() {
    try {
      this.isLoading = true;
      if (this.employeeId) {
        await this.auth.removeUserPhoto(this.employeeId);
        await this.fileUpload.deleteFile(this.photoURL);
        this.photoURL = this.defaultPhotoURL;
        console.log("Photo removed successfully.");
      }
    } catch (error: any) {
      if (
        !error.message.includes(
          "expected a child path but got a URL, use refFromURL instead",
        )
      )
        this.showError(
          "An error has occured while removing profile picture. Please try again.",
        );
    } finally {
      this.isLoading = false;
      this.showSuccess("Profile picture removed successfully.");
    }
  }

  async onUpload(event: any) {
    this.isLoading = true;
    for (let file of event.files) {
      try {
        const photoURL = await this.fileUpload.uploadFile(
          file,
          `users/${file.name}`,
        );
        if (this.employeeId) {
          await this.auth.updateUserPhoto(this.employeeId, photoURL);
          this.photoURL = photoURL;
        }
      } catch (error) {
        this.showError(
          "An error has occured while updating profile picture. Please try again.",
        );
      } finally {
        this.isLoading = false;
        this.showSuccess("Profile picture updated successfully.");
      }
    }
  }

  async handleSaveProfile() {
    try {
      if (this.username.length < 6) {
        this.showError("Your username must be at least 6 characters long");
      }
      if (!isUsernameValid(this.username)) {
        this.showError("Your username must be alphanumeric");
        return;
      }
      if (this.firstName.length < 2 || this.lastName.length < 2) {
        this.showError(
          "First name and last name must be at least 2 characters long",
        );
        return;
      }
      if (
        !this.birthDate ||
        !isUserAgeBetween6And130(new Date(this.birthDate))
      ) {
        this.showError(
          "You must be between 18 and 90 years old in order to register",
        );
        return;
      }

      this.isLoading = true;

      // check for username availability if there is a new username
      if (this.username !== this.actualUsername) {
        const isUsernameAvailable = await this.auth.isUsernameAvailable(
          this.username,
        );
        if (!isUsernameAvailable) {
          this.showError(
            "The new username is not available. Please choose another one.",
          );
          return;
        }
      }

      // update all shifts .authorFullName if firstName or lastName are changed
      let isFullNameChanged = false;
      const newData = {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate.toISOString(),
        gender: this.gender,
      };
      if (
        newData.firstName !== this.actualFirstName ||
        newData.lastName !== this.actualLastName
      ) {
        isFullNameChanged = true;
      }
      await this.auth.editProfile(this.employeeId, newData as any);
      if (isFullNameChanged) {
        const userId = this.auth.getAuthUser()?.uid;
        if (userId) {
          await this.database.updateShiftAuthorFullName(
            userId,
            `${this.firstName} ${this.lastName}`,
          );
        }
      }
      this.messageService.add({
        severity: "success",
        detail: "Changes saved succesfully",
        summary: "Success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
