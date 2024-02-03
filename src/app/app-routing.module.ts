import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user-guard.guard';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AllShiftsPageComponent } from './pages/all-shifts-page/all-shifts-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';

const routes: Routes = [
  // authentication routes
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
  // users routes
  {
    path: 'my-shifts',
    component: ShiftsPageComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard],
  },
  // admin routes
  { path: 'employees', component: UsersPageComponent },
  { path: 'shifts', component: AllShiftsPageComponent },
  { path: 'employee/:employeeId', component: EmployeePageComponent },
  // fallback route
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
