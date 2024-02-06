import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyShiftsPageComponent } from './pages/my-shifts-page/my-shifts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user-guard.guard';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { AllShiftsPageComponent } from './pages/all-shifts-page/all-shifts-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { AdminGuard } from './guards/admin-guard.guard';

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
    component: MyShiftsPageComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard],
  },
  // admin routes
  {
    path: 'employees',
    component: EmployeesPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'shifts',
    component: AllShiftsPageComponent,
    canActivate: [AdminGuard],
  },
  { path: 'employee/:employeeId', component: EmployeePageComponent },
  // fallback route
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
