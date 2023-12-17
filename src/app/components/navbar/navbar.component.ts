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
        label: 'Homepage',
        icon: 'pi pi-fw pi-calendar',
        url: '',
      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   // url: 'edit-user',
      //   // command: (event: MenuItemCommandEvent) => console.log(123),
      // },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-pencil',
        url: 'profile',
      },

      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-power-off',
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
      },
      {
        label: 'Sign In',
        icon: 'pi pi-fw pi-arrow-circle-right',
      },
    ];
  }
}
