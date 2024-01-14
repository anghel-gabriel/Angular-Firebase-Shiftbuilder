import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  loading: boolean = false;
  activityValues: number[] = [0, 100];
  selectedShifts = [];
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('op') overlayPanel!: OverlayPanel;
  addModalVisible = false;
  commentsModalVisible = false;
  currentComments: string = '';

  constructor() {
    console.log(new Date());
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  shifts = [
    {
      workplace: {
        name: 'NewTech Fullstack',
        imgUrl:
          'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
      },
      startTime: new Date(),
      endTime: Date.now(),
      hourlyWage: 20,
      profit: 160,
      comments: '1',
    },
    {
      workplace: {
        name: 'NewTech Frontend',
        imgUrl:
          'https://wawiwa-tech.com/wp-content/uploads/2021/09/Logo-NewTech.png',
      },
      comments: '',
      startTime: new Date(),
      endTime: Date.now(),
      hourlyWage: 20,
      profit: 160,
    },
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

  clg(event: any) {
    console.log(event);
  }

  toggleOverlayPanel(event: any, comments: string): void {
    if (comments) {
      this.currentComments = comments;
      this.overlayPanel.toggle(event);
    } else this.overlayPanel.hide();
  }

  showDialog() {
    this.addModalVisible = true;
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
                    this.shifts.map((shift) => ({
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
