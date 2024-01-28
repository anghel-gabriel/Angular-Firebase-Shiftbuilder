import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user-guard.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'shifts', component: ShiftsPageComponent, canActivate: [UserGuard] },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'sign-in', component: LoginPageComponent, canActivate: [AuthGuard] },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
