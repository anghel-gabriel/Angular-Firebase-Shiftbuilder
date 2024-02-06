import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// angular pages
import { MyShiftsPageComponent } from './pages/my-shifts-page/my-shifts-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AddFormComponent } from './components/add-form/add-form.component';

// angular components
import { NavbarComponent } from './components/navbar/navbar.component';

// ui library components
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ChangeEmailFormComponent } from './components/change-email-form/change-email-form.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { BestMonthComponent } from './components/best-month/best-month.component';
import { AllShiftsPageComponent } from './pages/all-shifts-page/all-shifts-page.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MyShiftsPageComponent,
    NavbarComponent,
    ProfilePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AddFormComponent,
    ErrorPageComponent,
    SpinnerComponent,
    ChangePasswordFormComponent,
    ChangeEmailFormComponent,
    ForgotPasswordComponent,
    EditFormComponent,
    BestMonthComponent,
    AllShiftsPageComponent,
    EmployeesPageComponent,
    EmployeePageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    StepsModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    FieldsetModule,
    SelectButtonModule,
    CalendarModule,
    TableModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    FileUploadModule,
    AvatarModule,
    SliderModule,
    MultiSelectModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
    MessagesModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      projectId: 'shiftease-2155e',
      appId: '1:779039596001:web:0f41e3f29b4b2bac7486a0',
      storageBucket: 'shiftease-2155e.appspot.com',
      apiKey: 'AIzaSyDHm2tBvg7SNWQdLOHWlp_rBfs_wcJBEYM',
      authDomain: 'shiftease-2155e.firebaseapp.com',
      messagingSenderId: '779039596001',
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'shiftease-2155e',
        appId: '1:779039596001:web:0f41e3f29b4b2bac7486a0',
        storageBucket: 'shiftease-2155e.appspot.com',
        apiKey: 'AIzaSyDHm2tBvg7SNWQdLOHWlp_rBfs_wcJBEYM',
        authDomain: 'shiftease-2155e.firebaseapp.com',
        messagingSenderId: '779039596001',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
