import { Component, OnInit } from '@angular/core';
import { MenuItemCommandEvent, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event: MenuItemCommandEvent) => console.log(123),
        // routerLink: '/salut',
        pRipple: true,
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        pRipple: true,
      },
      {
        label: 'Shifts',
        icon: 'pi pi-fw pi-calendar',
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
