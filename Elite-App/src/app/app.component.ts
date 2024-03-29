import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {HttpModule} from '@angular/http';

import { MyTeamsPage} from '../pages/pages';
import { GamePage } from '../pages/pages';
import { TeamDetail} from '../pages/pages';
import { TeamsPage} from '../pages/pages';
import { TournamentsPage} from '../pages/pages';
import {EliteApi} from './shared/shared';


@Component({
  templateUrl: 'app.html',
  providers:[
    EliteApi,
    HttpModule
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;


  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
goHome(){
  this.nav.push(MyTeamsPage);
}
goToTournaments(){
  this.nav.push(TournamentsPage);
}

}
