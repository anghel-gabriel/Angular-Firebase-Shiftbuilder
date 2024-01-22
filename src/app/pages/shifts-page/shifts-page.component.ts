import {Component, OnInit, ViewChild} from '@angular/core';
import * as FileSaver from 'file-saver';
import {OverlayPanel} from 'primeng/overlaypanel';
import {Table} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ShiftsService} from '../../services/shifts.service';

@Component({
  selector: 'app-shifts-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.scss'],
  providers: [ConfirmationService, MessageService],
})

export class ShiftsPageComponent implements OnInit {
  loading: boolean = false;
  activityValues: number[] = [0, 100];
  selectedShifts = [];
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('op') overlayPanel!: OverlayPanel;
  addModalVisible = false;
  commentsModalVisible = false;
  currentComments: string = '';
  shifts: any = [

    // {
    //   workplace: {
    //     name: 'NewTech Fullstack',
    //     imgUrl:
    //       'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    //   },
    //   startTime: new Date(),
    //   endTime: Date.now(),
    //   hourlyWage: 20,
    //   profit: 160,
    //   comments: '1',
    // },
    // {
    //   workplace: {
    //     name: 'NewTech Frontend',
    //     imgUrl:
    //       'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    //   },
    //   comments: '',
    //   startTime: new Date(),
    //   endTime: Date.now(),
    //   hourlyWage: 20,
    //   profit: 160,
    // },

  ];


  workplaces = [
    {
      name: 'NewTech Fullstack',
      imgUrl:
        'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    },
    {
      name: 'NewTech Frontend',
      imgUrl:
        'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private db: ShiftsService
  ) {
  }

  ngOnInit() {
    this.db.getShiftsChanges().subscribe((shifts) => {
      this.shifts = [...shifts];
      console.log('shiftspage', [...shifts]);
    });
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
  showDialog() {
    this.addModalVisible = true;
  }

  // delete confirmation popup
  onDeleteClick(event: Event, shift: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.db.deleteShift(shift.id);
      },
      reject: () => {
      },
    });
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
