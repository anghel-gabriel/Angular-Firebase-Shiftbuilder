import { Component, HostListener } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MessageService } from "primeng/api";
import {
  isUsernameValid,
  isUserAgeBetween6And130,
} from "../../utils/validation";
import { AuthenticationService } from "../../services/authentication.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { defaultPhotoURL } from "src/app/utils/defaultProfileImage";
import { IGenderOption, genderOptionList } from "src/app/utils/genderOptions";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
  providers: [MessageService],
})
export class ProfilePageComponent {
  // user properties
  uid = "";
  email = "";
  username = "";
  firstName = "";
  lastName = "";
  birthDate: any;
  gender: string | IGenderOption = "";
  photoURL = "";
  activeIndex = 0;
  checked = false;
  isLoading = true;
  isViewPortAtLeastMedium: boolean = false;
  defaultPhotoURL = defaultPhotoURL;
  isChangingPasswordModalVisible = false;
  isChangingEmailModalVisible = false;
  actualFirstName = "";
  actualLastName = "";
  actualUsername = "";

  genderOptions = genderOptionList;
  // steps component
  items: MenuItem[] | undefined = [
    {
      label: "Credentials",
    },
    {
      label: "Personal",
    },
    {
      label: "Agreement",
    },
  ];

  constructor(
    private messageService: MessageService,
    private auth: AuthenticationService,
    private fileUpload: FileUploadService,
    private database: DatabaseService,
  ) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
    this.auth.getLoggedUser().subscribe((data: any) => {
      this.fillProfileFields(data);
      if (data) this.isLoading = false;
    });
  }

  // adjust previous&next buttons depending on viewport width
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  // fill profile input fields
  fillProfileFields(data: any) {
    if (data) {
      this.uid = data.uid;
      this.username = data.email;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.username = data.username;
      this.birthDate = new Date(data.birthDate);
      this.gender = data.gender || { name: "Unknown", value: "unknown" };
      this.photoURL = data.photoURL || this.defaultPhotoURL;
      this.actualFirstName = data.firstName;
      this.actualLastName = data.lastName;
      this.actualUsername = data.username;
    }
  }

  // show error toast function
  showError(message: any) {
    this.messageService.add({
      severity: "error",
      detail: message,
      summary: "Error",
    });
  }

  // show success toast notification
  showSuccess(message: any) {
    this.messageService.add({
      severity: "success",
      detail: message,
      summary: "Success",
    });
  }

  // set loading spinner
  setLoadingSpinner(event: any) {
    this.isLoading = event;
  }

  // form validation
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
      await this.auth.editProfile(this.uid, newData as any);
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
      this.showError(
        "An error has occurred while updating data. Please try again.",
      );
    } finally {
      this.isLoading = false;
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
        const userId = this.auth.getAuthUser()?.uid;
        if (userId) {
          await this.auth.updateUserPhoto(userId, photoURL);
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

  async removePhoto() {
    this.isLoading = true;
    try {
      const userId = this.auth.getAuthUser()?.uid;
      if (userId) {
        await this.auth.removeUserPhoto(userId);
        await this.fileUpload.deleteFile(this.photoURL);
        this.photoURL = this.defaultPhotoURL;
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
}
