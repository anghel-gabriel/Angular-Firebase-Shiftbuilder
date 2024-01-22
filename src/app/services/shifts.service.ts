import {Injectable} from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  shiftsObs = new BehaviorSubject<any>([]);
  shiftsCol = collection(this.firestore, 'rbtsASDASD');
  shiftsArray: any = [];
  loggedUserUid = new BehaviorSubject<string>('');
  private areShiftsLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public firestore: Firestore,
    private auth: AuthenticationService
  ) {
    this.auth
      .getLoggedUser()
      .subscribe((userData) => this.loggedUserUid.next(userData?.uid));
  }

  getAreShiftsLoading() {
    return this.areShiftsLoading.asObservable();
  }

  async getUserFields() {
    try {
      const userDocRef = doc(this.firestore, `users/J1ZOqPAlYaBSbT5thkI9`);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        console.log('User data:', userDocSnapshot.data());
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Problem getting user document.', error);
    }
  }

  async getUserShifts() {
    try {
      const shiftsColRef = collection(
        this.firestore,
        `users/J1ZOqPAlYaBSbT5thkI9/shifts`
      );
      const querySnapshot = await getDocs(shiftsColRef);
      querySnapshot.forEach((doc) => {
        this.shiftsArray.push({...doc.data(), id: doc.id});
      });
      console.log(this.shiftsArray);
    } catch (error) {
      console.error('Problem getting shifts.', error);
    }
  }

  async addShift(shift: any) {
    try {
      await addDoc(this.shiftsCol, {shift: shift});
    } catch (error) {
      console.error(error);
    }
  }

  async editShift(shiftId: string, newData: any) {
    const shiftRef = doc(this.firestore, 'shifts', shiftId);
    try {
      await updateDoc(shiftRef, newData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteShift(shiftId: string) {
    try {
      const shiftRef = doc(this.firestore, 'shifts', shiftId);
      await deleteDoc(shiftRef);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
