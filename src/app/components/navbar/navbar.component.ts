import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

// ! #TODO: add p-datatable-striped to table

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService],
})
export class NavbarComponent {
  navbarItems = [
    { label: 'Homepage', icon: 'pi pi-fw pi-home', url: '' },
  ] as any;
  isLoading: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.onUserStateChanged(() => {
      this.updateNavbarItems(!!this.auth.getAuthUser());
    });
  }

  updateNavbarItems(isUserLogged: boolean) {
    this.navbarItems = [
      {
        label: 'My shifts',
        icon: 'pi pi-fw pi-stopwatch',
        url: 'my-shifts',
        visible: isUserLogged,
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-pencil',
        url: 'profile',
        visible: isUserLogged,
      },

      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-wrench',
        items: [
          {
            label: 'Employees',
            icon: 'pi pi-fw pi-users',
            url: 'employees',
          },
          {
            label: 'Shifts',
            icon: 'pi pi-fw pi-calendar',
            url: 'shifts',
          },
        ],
      },

      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-power-off',
        command: async () => {
          await this.onSignOut();
        },
        visible: isUserLogged,
      },
      {
        label: 'Sign In',
        icon: 'pi pi-fw pi-arrow-circle-right',
        url: 'sign-in',
        visible: !isUserLogged,
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
        url: 'register',
        visible: !isUserLogged,
      },
    ];
  }

  async onSignOut() {
    this.isLoading = true;
    try {
      await this.auth.logOut();
      await this.router.navigate(['/sign-in']);
    } catch (error: any) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
