import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [MessageService],
})
export class HomepageComponent {
  loading: boolean = false;
  activityValues: number[] = [0, 100];
  selectedShifts = [];
  @ViewChild('dt') dt: Table | undefined;

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
    },
  ];

  representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
  ];

  statuses = [
    { label: 'Unqualified', value: 'unqualified' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'New', value: 'new' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Renewal', value: 'renewal' },
    { label: 'Proposal', value: 'proposal' },
  ];

  exportExcel() {
    import('xlsx').then((xlsx) => {
      FileSaver.saveAs(
        new Blob([xlsx.write({ Sheets: { data: xlsx.utils.json_to_sheet(this.shifts) }, SheetNames: ['data'] }, {
            bookType: 'xlsx',
            type: 'array',
          })], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        }),
        'ShiftEase' + new Date().getTime() + '.xlsx'
      );
    });
  }
}
