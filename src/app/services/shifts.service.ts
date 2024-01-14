import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  orderBy,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  shiftsObs = new BehaviorSubject<any>([]);
  shiftsCol = collection(this.firestore, 'rbtsASDASD');
  shiftsArray: any = [];

  constructor(public firestore: Firestore) {}

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
        this.shiftsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(this.shiftsArray);
    } catch (error) {
      console.error('Problem getting shifts.', error);
    }
  }

  async addShift(shift: any) {
    try {
      await addDoc(this.shiftsCol, { shift: shift });
    } catch (error) {
      console.error(error);
    }
  }
}
