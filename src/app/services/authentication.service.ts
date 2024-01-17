import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {Firestore, doc, setDoc, getDoc} from '@angular/fire/firestore';
import {RegisterInterface, UserInterface} from '../utils/interfaces';
import {BehaviorSubject} from 'rxjs';
import {DocumentData} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private loggedUser = new BehaviorSubject<UserInterface | DocumentData | null | undefined>(null);

  constructor(public auth: Auth, public firestore: Firestore) {
  }

  getLoggedUser() {
    return this.loggedUser.asObservable();
  }

  async logOut() {
    this.loggedUser.next(null);
  }

  async signIn(email: string, password: string) {
    try {
      const signInResponse = await signInWithEmailAndPassword(this.auth, email, password);
      const loggedUserUid = signInResponse.user.uid;
      const loggedUserRef = doc(this.firestore, `users/${loggedUserUid}`);
      const loggedUserDoc = await getDoc(loggedUserRef);
      const loggedUserData = loggedUserDoc.data();
      console.log(loggedUserData);
      this.loggedUser.next(loggedUserData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async register(registerData: RegisterInterface) {
    try {
      const registerResponse = await createUserWithEmailAndPassword(this.auth, registerData.email, registerData.password);
      const newUserData: UserInterface = {
        uid: registerResponse.user.uid,
        email: registerData.email,
        username: registerData.username,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        birthDate: registerData.birthDate,
        gender: registerData.gender
      };
      const newUserRef = doc(this.firestore, `users/${newUserData.uid}`);
      await setDoc(newUserRef, newUserData);
      this.loggedUser.next(newUserData);

    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
