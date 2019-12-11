import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp({
      apiKey: "AIzaSyC4SejFR19H2OC5kghqVRzvW3JJ4MuuNuE",
      authDomain: "moneytracker-3d4d5.firebaseapp.com",
      databaseURL: "https://moneytracker-3d4d5.firebaseio.com",
      projectId: "moneytracker-3d4d5",
      storageBucket: "moneytracker-3d4d5.appspot.com",
      messagingSenderId: "905724178130",
      appId: "1:905724178130:web:ed504b850c05c1dd95470b",
      measurementId: "G-T834M3KC28"
    })
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    firebase.auth().signOut();
    
    this.menu.close();
    
    this.router.navigateByUrl('/login');
  }
}