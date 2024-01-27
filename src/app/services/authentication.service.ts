import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { RegisterInterface, UserInterface } from '../utils/interfaces';
import { BehaviorSubject } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedUser = new BehaviorSubject<
    UserInterface | DocumentData | null | undefined
  >(null);

  constructor(public auth: Auth, public firestore: Firestore) {}

  getAuthUser() {
    return this.auth.currentUser;
  }

  getLoggedUser() {
    return this.loggedUser.asObservable();
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('username', '==', username));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  }

  async isEmailAvailable(username: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', username));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  }

  async register(registerData: RegisterInterface) {
    try {
      // check if the username already exists in the users collection
      const usernameQuery = query(
        collection(this.firestore, 'users'),
        where('username', '==', registerData.username)
      );
      const querySnapshot = await getDocs(usernameQuery);
      if (!querySnapshot.empty) {
        // if a user with the same username is found, throw an error
        throw new Error(
          'Username already exists. Please choose a different username.'
        );
      }
    } catch (error: any) {
      throw new Error(error);
    }
    // create user in firebase auth
    try {
      const registerResponse = await createUserWithEmailAndPassword(
        this.auth,
        registerData.email,
        registerData.password
      );
      const newUserData: UserInterface = {
        uid: registerResponse.user.uid,
        email: registerData.email,
        username: registerData.username,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        birthDate: registerData.birthDate,
        gender: registerData.gender,
        role: 'user',
      };
      // create username in firestore
      const newUserRef = doc(this.firestore, `users/${newUserData.uid}`);
      await setDoc(newUserRef, newUserData);
      this.loggedUser.next(newUserData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const signInResponse = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const loggedUserUid = signInResponse.user.uid;
      const loggedUserRef = doc(this.firestore, `users/${loggedUserUid}`);
      const loggedUserDoc = await getDoc(loggedUserRef);
      const loggedUserData = loggedUserDoc.data();
      this.loggedUser.next(loggedUserData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async logOut() {
    try {
      await this.auth.signOut();
      this.loggedUser.next(null);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async changeEmail(newEmail: string) {
    try {
      if (this.auth.currentUser)
        await updateEmail(this.auth.currentUser, newEmail);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async changePassword(newPassword: string) {
    try {
      if (this.auth.currentUser)
        await updatePassword(this.auth.currentUser, newPassword);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  onUserStateChanged(fn: any) {
    return this.auth.onAuthStateChanged(fn);
  }
}
