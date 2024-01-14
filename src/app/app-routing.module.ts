import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'shifts', component: ShiftsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'sign-in', component: LoginPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
