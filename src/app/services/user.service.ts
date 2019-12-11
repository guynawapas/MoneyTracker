import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public signedIn = false;

  constructor( private router: Router ) {
    // firebase.auth().onAuthStateChanged((user: firebase.User) => {
      
    //   if (!this.signedIn) {
    //     console.log('User is logged in');
    //     this.signedIn=true;
    //     this.router.navigateByUrl('/list');
    //   } else {
    //     this.signedIn=false;
    //     console.log('User is not logged in');
    //     this.router.navigateByUrl('/login');
    //   }
    // });
  }

  signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signout() {
    return firebase.auth().signOut();
  }

  currentUser() {
    return firebase.auth().currentUser;
  }
}