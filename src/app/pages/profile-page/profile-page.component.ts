import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  isUsernameValid,
  isUserAgeBetweenEighteenAndNinety,
} from '../../utils/validation';
import { AuthenticationService } from '../../services/authentication.service';
import { UserInterface } from '../../utils/interfaces';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadEvent } from 'primeng/fileupload';
import { forkJoin } from 'rxjs';
import { defaultPhotoURL } from 'src/app/utils/defaultProfileImage';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [MessageService],
})
export class ProfilePageComponent {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';
  birthDate: any;
  gender: string | { name: string; value: string } = '';
  photoURL = '';
  activeIndex = 0;
  checked = false;
  isLoading = true;
  isViewPortAtLeastMedium: boolean = false;
  defaultPhotoURL = defaultPhotoURL;
  isChangingPasswordModalVisible = false;
  isChangingEmailModalVisible = false;

  genderOptions = [
    { name: 'Unknown', value: 'unknown' },
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ];
  // steps component
  items: MenuItem[] | undefined = [
    {
      label: 'Credentials',
    },
    {
      label: 'Personal',
    },
    {
      label: 'Agreement',
    },
  ];

  constructor(
    private messageService: MessageService,
    private auth: AuthenticationService,
    private fileUpload: FileUploadService
  ) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
    this.auth.getLoggedUser().subscribe((data: any) => {
      console.log(data);
      this.fillProfileFields(data);
      if (data) this.isLoading = false;
    });
  }

  // adjust previous&next buttons depending on viewport width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isViewPortAtLeastMedium = window.innerWidth >= 640;
  }

  // fill profile input fields
  fillProfileFields(data: any) {
    if (data) {
      this.username = data.email;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.username = data.username;
      this.birthDate = new Date(data.birthDate);
      this.gender = data.gender || { name: 'Unknown', value: 'unknown' };
      this.photoURL = data.photoURL || this.defaultPhotoURL;
    }
  }

  // show error toast function
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
      summary: 'Error',
    });
  }

  // form validation
  async handleSaveProfile() {
    try {
      if (this.activeIndex === 0) {
        if (this.username.length < 6) {
          this.showError('Your username must be at least 6 characters long');
        }
        if (!isUsernameValid(this.username)) {
          this.showError('Your username must be alphanumeric');
          return;
        }
      }
      if (this.firstName.length < 2 || this.lastName.length < 2) {
        this.showError(
          'First name and last name must be at least 2 characters long'
        );
        return;
      }
      if (
        !this.birthDate ||
        !isUserAgeBetweenEighteenAndNinety(new Date(this.birthDate))
      ) {
        this.showError(
          'You must be between 18 and 90 years old in order to register'
        );
        return;
      }

      this.isLoading = true;
      const newData = {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate.toISOString(),
        gender: this.gender,
      };
      await this.auth.editProfile(newData as any);
      this.messageService.add({
        severity: 'success',
        detail: 'Changes saved succesfully',
        summary: 'Success',
      });
    } catch (error) {
      console.log(error);
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
          `users/${file.name}`
        );
        const userId = this.auth.getAuthUser()?.uid;
        if (userId) {
          await this.auth.updateUserPhoto(userId, photoURL);
          this.photoURL = photoURL; // Update the avatar
          console.log('Photo uploaded and user profile updated.');
        }
      } catch (error) {
        console.error('Error uploading file: ', error);
      } finally {
        this.isLoading = false;
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
        console.log('Photo removed successfully.');
      }
    } catch (error) {
      console.error('Error removing photo: ', error);
    } finally {
      this.isLoading = false;
    }
  }
}
