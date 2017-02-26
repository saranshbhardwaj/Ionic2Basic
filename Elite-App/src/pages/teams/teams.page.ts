import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import * as _ from 'lodash';
import {TeamHomePage} from '../pages';
import {EliteApi} from '../../app/shared/shared';

@Component({
        templateUrl:'teams.page.html'

})
export class TeamsPage{

    private allTeams: any;
    private allTeamsDivisions: any;
      teams = [];

    constructor(private nav: NavController, 
                private navParams: NavParams, 
                private eliptApi: EliteApi,
                private loadingController: LoadingController)
     { }

     ionViewDidLoad(){
         let selectedTourney = this.navParams.data;

         let loader = this.loadingController.create({
            content: 'Getting Data...'
        });
        loader.present().then(() => {

         this.eliptApi.getTournamentData(selectedTourney.id).subscribe(data =>{
             this.allTeams = data.teams;
             this.allTeamsDivisions =
                 _.chain(data.teams)
                  .groupBy('division')
                  .toPairs()
                  .map(item =>_.zipObject(['divisionName', 'divisionTeams'], item))
                  .value(); 
             this.teams = this.allTeamsDivisions;
             console.log('division teams', this.teams);
             loader.dismiss();
         });
        });

     }

    itemTapped($event, team){
         this.nav.push(TeamHomePage, team);
    }
}