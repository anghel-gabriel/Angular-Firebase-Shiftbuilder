import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { doc } from 'firebase/firestore';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { defaultPhotoURL } from 'src/app/utils/defaultProfileImage';
import { getImageUrl } from 'src/app/utils/workplaces';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class EmployeesPageComponent {
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('op') overlayPanel!: OverlayPanel;
  // loading states
  loading: boolean = false;
  isLoading: boolean = false;
  myId = this.auth.getAuthUser()?.uid;
  myRole = '';
  // modals
  addModalVisible = false;
  editModalVisible = false;
  bestMonthModalVisible = false;
  // comment
  currentComments: string = '';
  // shifts
  users: any = [];
  selectedShift: any = null;
  getWorplaceImage = getImageUrl;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private router: Router,
    private admin: AdminService
  ) {
    this.auth.getLoggedUser().subscribe((data) => (this.myRole = data.role));
  }

  ngOnInit() {
    // TODO: fix loading spinner when fetching data
    this.db.updateAllUsers().subscribe((users) => {
      this.users = [...users];
      console.log('allusers', this.users);
    });
    this.db.getAreMyShiftsLoading().subscribe((val) => (this.isLoading = val));
  }

  // best month modal
  onBestMonthClick() {
    this.bestMonthModalVisible = true;
  }
  onBestMonthModalClose() {
    this.bestMonthModalVisible = false;
  }

  // add shift modal
  onAddClick() {
    this.addModalVisible = true;
  }

  // edit modal
  onEditClick(employee: any) {
    if (employee.uid === this.myId) this.router.navigate(['/profile']);
    else this.router.navigate([`/employee/${employee.uid}`]);
  }

  // delete confirmation employee popup
  onDeleteEmployeeClick(event: Event, shift: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete the employee?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.onDeleteConfirm(shift.id);
      },
      reject: () => {},
    });
  }

  // delete employee from auth and firestore
  async onDeleteConfirm(userId: any) {
    try {
      this.isLoading = true;
      await this.auth.deleteEmployee(userId);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async onEnableDisableEmployee(userId: string, isDisabled: boolean) {
    try {
      this.isLoading = true;
      if (isDisabled) await this.auth.enableEmployee(userId);
      else await this.auth.disableEmployee(userId);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  // delete all employee shifts
  async onDeleteEmployeeShifts(employee: any) {
    try {
      this.isLoading = true;
      await this.db.deleteShiftsByUserId(employee);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  // search input (by workplace)
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // shifts to excel
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.users.map((shift: any) => ({
          // ! #TODO: modify this
          Workplace: shift.workplace,
          'Start Time': shift.startTime.toLocaleString(),
          'End Time': shift.endTime.toLocaleString(),
          'Hourly Wage ($)': shift.hourlyWage,
          'Profit ($)': shift.profit,
          Comments: shift.comments,
        }))
      );

      const workbook = {
        Sheets: { Shifts: worksheet },
        SheetNames: ['Shifts'],
      };

      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });

      FileSaver.saveAs(data, `ShiftEase_${new Date().getTime()}.xlsx`);
    });
  }
}

// ! #TODO: feature to make user admin if superadmin
// ! #TODO: handle disabled user
