import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StandingsPage, TeamDetail,MyTeamsPage} from '../pages';

@Component({
        templateUrl:'team-home.page.html'

})
export class TeamHomePage{

       team: any;
       teamDetailTab = TeamDetail;
       standingsTab = StandingsPage;

    constructor(private nav: NavController, private navParams: NavParams){
        this.team = this.navParams.data;
    }
   goHome(){
      //this.nav.push(MyTeamsPage);
      this.nav.popToRoot();

   }

}