import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  collectionChanges,
  where,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  shiftsObs = new BehaviorSubject<any>([]);
  shiftsCol = collection(this.firestore, 'shifts');
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

  getShiftsChanges() {
    return collectionChanges(query(collection(this.firestore, 'shifts'))).pipe(
      switchMap(async () => {
        const val = await this.getUserShifts();
        return val;
      })
    );
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

  async addShift(shift: any) {
    try {
      await addDoc(this.shiftsCol, {
        ...shift,
        author: this.auth.getAuthUser()?.uid,
      });
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

  private async getUserShifts() {
    this.areShiftsLoading.next(true);
    try {
      const user = this.auth.getAuthUser();
      const userId = user?.uid || '';
      if (!userId) throw new Error('User not logged');

      let queryRef = query(
        collection(this.firestore, 'shifts'),
        where('author', '==', userId),
        orderBy('startTime', 'desc')
      );
      const docs = await getDocs(queryRef);
      const shiftsList = [] as any;

      docs.forEach((val: any) => {
        shiftsList.push({
          id: val.id,
          ...val.data(),
        });
      });

      console.log('shiftsserv', shiftsList);
      return shiftsList;
    } catch (error) {
      console.log(error);
    } finally {
      this.areShiftsLoading.next(false);
    }
  }
}
