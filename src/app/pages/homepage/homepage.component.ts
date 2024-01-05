import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [MessageService],
})
export class HomepageComponent implements OnInit {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  items: MenuItem[] | undefined;

  products1 = [
    {
      code: 'zz21cz3c1',
      name: 'Blue Band',
      category: 'Fitness',
      quantity: 2,
      price: '79',
    },
    {
      code: 'nvklal433',
      name: 'Black Watch',
      category: 'Accessories',
      quantity: 61,
      price: '72',
    },
    {
      code: 'h456wer53',
      name: 'Bracelet',
      category: 'Accessories',
      quantity: 73,
      price: '15',
    },
    {
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      price: '65',
    },
    {
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      category: 'Clothing',
      quantity: 25,
      price: '29',
    },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
