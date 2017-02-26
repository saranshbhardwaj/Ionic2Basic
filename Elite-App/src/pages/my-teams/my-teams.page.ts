import {Component} from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular';
import {TeamHomePage ,TournamentsPage} from '../pages';
import {EliteApi} from '../../app/shared/shared';

@Component({
        templateUrl:'my-teams.page.html'

})
export class MyTeamsPage{

    favorites = [
        {
            team: {id:6182, name: 'HC Elite 7th', coach: 'Saransh'},
            tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'March Madness Tournament'
        }
    ];
    constructor(private nav: NavController,
                private loadingController: LoadingController,
                private eliteApi: EliteApi){}

    goToTournaments(){
          this.nav.push(TournamentsPage);
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting Data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
    }
}