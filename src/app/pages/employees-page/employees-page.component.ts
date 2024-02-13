import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import * as FileSaver from "file-saver";
import { ConfirmationService, MessageService } from "primeng/api";
import { OverlayPanel } from "primeng/overlaypanel";
import { Table } from "primeng/table";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-employees-page",
  templateUrl: "./employees-page.component.html",
  styleUrl: "./employees-page.component.scss",
  providers: [ConfirmationService, MessageService],
})
export class EmployeesPageComponent {
  @ViewChild("dt") dt: Table | undefined;
  @ViewChild("op") overlayPanel!: OverlayPanel;
  // loading states
  loading: boolean = false;
  isLoading: boolean = false;
  // self info
  myId = "";
  myRole = "";
  // modals
  addModalVisible = false;
  editModalVisible = false;
  bestMonthModalVisible = false;
  // comment
  currentComments: string = "";
  // shifts
  users: any = [];
  selectedShift: any = null;

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private router: Router,
  ) {
    // TODO: fix loading spinner when fetching data
    this.db.updateAllUsers().subscribe((users) => {
      this.users = [...users];
      console.log("allusers", this.users);
    });
    this.auth.getLoggedUser().subscribe((data) => {
      this.myId = data.uid;
      this.myRole = data.role;
    });
    this.db.getAreMyShiftsLoading().subscribe((val) => (this.isLoading = val));
  }

  // edit modal
  onEditClick(employee: any) {
    if (employee.uid === this.myId) this.router.navigate(["/profile"]);
    else this.router.navigate([`/employee/${employee.uid}`]);
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
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.users.map((shift: any) => ({
          // ! #TODO: modify this and all excels
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
