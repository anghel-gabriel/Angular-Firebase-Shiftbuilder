import { Component } from '@angular/core';
import { MenuItemCommandEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService],
})
export class NavbarComponent {
  items = [
    { label: 'Homepage', icon: 'pi pi-fw pi-home', url: '' },
    {
      label: 'Shifts',
      icon: 'pi pi-fw pi-calendar',
      url: 'shifts',
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-pencil',
      url: 'profile',
    },

    {
      label: 'Sign Out',
      icon: 'pi pi-fw pi-power-off',
      command: (event: MenuItemCommandEvent) => {
        console.log(123);
      },
    },
    {
      label: 'Register',
      icon: 'pi pi-fw pi-user-plus',
      url: 'register',
    },
    {
      label: 'Sign In',
      icon: 'pi pi-fw pi-arrow-circle-right',
      url: 'sign-in',
    },
  ];
}
