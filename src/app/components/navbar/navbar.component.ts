import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService],
})
export class NavbarComponent {
  navbarItems = [{label: 'Homepage', icon: 'pi pi-fw pi-home', url: ''}] as any;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.onUserStateChanged(() => {
      this.updateNavbarItems((!!this.auth.getAuthUser()));
    });
  }

  updateNavbarItems(isUserLogged: boolean) {
    this.navbarItems = [
      {label: 'Homepage', icon: 'pi pi-fw pi-home', url: ''},
      {
        label: 'Shifts',
        icon: 'pi pi-fw pi-calendar',
        url: 'shifts',
        visible: isUserLogged
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-pencil',
        url: 'profile',
        visible: isUserLogged
      },

      {
        label: 'Sign Out',
        icon: 'pi pi-fw pi-power-off',
        command: async () => {
          await this.onSignOut();
        },
        visible: isUserLogged
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
        url: 'register',
        visible: !isUserLogged
      },
      {
        label: 'Sign In',
        icon: 'pi pi-fw pi-arrow-circle-right',
        url: 'sign-in',
        visible: !isUserLogged
      },
    ];
  }


  async onSignOut() {
    try {
      await this.auth.logOut();
      await this.router.navigate(['/sign-in']);
    } catch (error: any) {
      console.log(error);
    }
  }
}
