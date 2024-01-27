import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shifts-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ShiftsPageComponent implements OnInit {
  loading: boolean = false;
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('op') overlayPanel!: OverlayPanel;
  addModalVisible = false;
  editModalVisible = false;
  currentComments: string = '';
  shifts: any = [];
  selectedShift: any = null;

  workplaces = [
    {
      name: 'Fullstack',
      value: 'Fullstack',
      imgUrl:
        'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    },
    {
      name: 'Frontend',
      label: 'Frontend',
      value: 'Frontend',
      imgUrl:
        'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private db: ShiftsService
  ) {}

  ngOnInit() {
    // TODO: fix loading spinner when fetching data

    this.loading = true; // Set loading to true before fetching data
    this.db.getShiftsChanges().subscribe((shifts) => {
      this.shifts = [...shifts];
      this.loading = false;
    }); // Set loading to false after data is fetched
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // view button overlay panel
  toggleOverlayPanel(event: any, comments: string): void {
    if (comments) {
      this.currentComments = comments;
      this.overlayPanel.toggle(event);
    } else this.overlayPanel.hide();
  }

  // add shift modal
  onAddClick() {
    this.addModalVisible = true;
  }

  onEditClick(shift: any) {
    this.selectedShift = shift;
    this.editModalVisible = true;
  }

  async onEditSubmit(editedShift: any) {
    this.editModalVisible = false;
    this.loading = true;
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
  }

  // delete confirmation popup
  onDeleteClick(event: Event, shift: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
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
      console.error('Error deleting shift', error);
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      FileSaver.saveAs(
        new Blob(
          [
            xlsx.write(
              {
                Sheets: {
                  Shifts: xlsx.utils.json_to_sheet(
                    this.shifts.map((shift: any) => ({
                      ...shift,
                      workplace: shift.workplace.name,
                    }))
                  ),
                },
                SheetNames: ['Shifts'],
              },
              {
                bookType: 'xlsx',
                type: 'array',
              }
            ),
          ],
          {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
          }
        ),
        'ShiftEase' + new Date().getTime() + '.xlsx'
      );
    });
  }
}
