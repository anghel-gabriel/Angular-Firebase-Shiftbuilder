import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { defaultPhotoURL } from 'src/app/utils/defaultProfileImage';
import { genderOptionList } from 'src/app/utils/genderOptions';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
  providers: [MessageService],
})
export class EmployeePageComponent implements OnInit {
  defaultPhotoURL = defaultPhotoURL;
  isLoading = true;
  employeeId: any;
  // employeeData
  firstName = '';
  lastName = '';
  username = '';
  birthDate: any;
  gender = '';
  photoURL = '';
  genderOptions = genderOptionList;
  isChangingPasswordModalVisible = false;
  isChangingEmailModalVisible = false;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId');
    const employeeData = this.fillFieldsWithEmployeeData();
  }

  async fillFieldsWithEmployeeData() {
    try {
      const employeeData = await this.auth.getEmployeeData(this.employeeId);
      if (employeeData) {
        this.firstName = employeeData['firstName'];
        this.lastName = employeeData['lastName'];
        this.username = employeeData['username'];
        this.gender = employeeData['gender'];
        this.photoURL = employeeData['photoURL'] || defaultPhotoURL;
        this.birthDate = new Date(employeeData['birthDate']);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  removePhoto() {}
  onUpload(event: any) {}
  handleSaveProfile() {}
}
