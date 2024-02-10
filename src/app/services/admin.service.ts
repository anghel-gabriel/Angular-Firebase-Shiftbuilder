import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private fns: AngularFireFunctions) {}

  async adminUpdateUserEmail(userId: string, newEmail: string) {
    const callable = this.fns.httpsCallable('adminUpdateUserEmail');
    try {
      return await callable({ userId, newEmail }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async adminChangeUserPassword(userId: string, newPassword: string) {
    const callable = this.fns.httpsCallable('adminChangeUserPassword');
    try {
      return await callable({ userId, newPassword }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async adminDeleteUser(userId: string) {
    const callable = this.fns.httpsCallable('adminDeleteUser');
    try {
      return await callable({ userId }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async adminEnableUser(userId: string) {
    const callable = this.fns.httpsCallable('adminEnableUser');
    try {
      return await callable({ userId }).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async adminDisableUser(userId: string) {
    const callable = this.fns.httpsCallable('adminDisableUser');
    try {
      return await callable({ userId }).toPromise();
    } catch (error) {
      throw error;
    }
  }
}
