import { Component, ViewChild } from "@angular/core";
import * as FileSaver from "file-saver";
import { ConfirmationService, MessageService } from "primeng/api";
import { OverlayPanel } from "primeng/overlaypanel";
import { Table } from "primeng/table";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DatabaseService } from "src/app/services/database.service";
import { defaultPhotoURL } from "src/app/utils/defaultProfileImage";
import { getImageUrl } from "src/app/utils/workplaces";

@Component({
  selector: "app-all-shifts-page",
  templateUrl: "./all-shifts-page.component.html",
  styleUrl: "./all-shifts-page.component.scss",
  providers: [ConfirmationService, MessageService],
})
export class AllShiftsPageComponent {
  @ViewChild("dt") dt: Table | undefined;
  @ViewChild("op") overlayPanel!: OverlayPanel;
  // loading states
  loading: boolean = false;
  isLoading: boolean = false;
  // user data
  userPhotoURL: any;
  userCompleteName: string = "";
  // modals
  addModalVisible = false;
  editModalVisible = false;
  bestMonthModalVisible = false;
  statisticsModalVisible = false;
  // comment
  currentComments: string = "";
  // shifts
  shifts: any = [];
  selectedShift: any = null;
  getWorkplaceImage = getImageUrl;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private db: DatabaseService,
    private auth: AuthenticationService,
  ) {
    this.auth.getLoggedUser().subscribe((data) => {
      this.userPhotoURL = data?.photoURL || defaultPhotoURL;
      this.userCompleteName = data?.firstName + " " + data?.lastName;
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: "error",
      detail: message,
      summary: "Error",
    });
  }

  ngOnInit() {
    // TODO: fix loading spinner when fetching data
    this.db.updateShifts().subscribe((shifts) => {
      this.shifts = [...shifts].map((shift) => {
        return {
          ...shift,
          startTime: new Date(shift.startTime),
          endTime: new Date(shift.endTime),
        };
      });
    });
    this.db.getAreMyShiftsLoading().subscribe((val) => (this.isLoading = val));
  }

  // statistics modal
  onStatisticsClick() {
    this.statisticsModalVisible = true;
  }
  onStatisticsModalClose() {
    this.statisticsModalVisible = false;
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
  async onAddSubmit(addedShift: any) {
    this.loading = true;
    this.addModalVisible = false;
    try {
      await this.db.addShift(addedShift);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
  onAddModalClose() {
    this.addModalVisible = false;
  }

  // edit modal
  onEditClick(shift: any) {
    this.selectedShift = shift;
    this.editModalVisible = true;
  }
  async onEditSubmit(editedShift: any) {
    this.loading = true;
    this.editModalVisible = false;
    try {
      await this.db.editShift(this.selectedShift.id, editedShift);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
  onEditModalClose() {
    this.selectedShift = null;
    this.editModalVisible = false;
  }

  // delete confirmation popup
  onDeleteClick(event: Event, shift: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Are you sure?",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-sm",
      accept: () => {
        this.onDeleteConfirm(shift.id);
      },
      reject: () => {},
    });
  }
  async onDeleteConfirm(shiftId: any) {
    this.loading = true;
    try {
      await this.db.deleteShift(shiftId);
    } catch (error: any) {
      console.error("Error deleting shift", error);
    } finally {
      this.loading = false;
    }
  }

  // search input (by workplace)
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // view comment button overlay panel
  toggleOverlayPanel(event: any, comments: string): void {
    if (comments) {
      this.currentComments = comments;
      this.overlayPanel.toggle(event);
    } else this.overlayPanel.hide();
  }

  // shifts to excel
  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.shifts.map((shift: any) => ({
          Workplace: shift.workplace,
          "Start Time": shift.startTime.toLocaleString(),
          "End Time": shift.endTime.toLocaleString(),
          "Hourly Wage ($)": shift.hourlyWage,
          "Profit ($)": shift.profit,
          Comments: shift.comments,
        })),
      );

      const workbook = {
        Sheets: { Shifts: worksheet },
        SheetNames: ["Shifts"],
      };

      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      FileSaver.saveAs(data, `ShiftEase_${new Date().getTime()}.xlsx`);
    });
  }
}
