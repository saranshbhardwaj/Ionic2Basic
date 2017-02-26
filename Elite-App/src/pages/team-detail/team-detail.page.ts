import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

import {EliteApi} from '../../app/shared/shared';
import {GamePage} from '../pages';

@Component({
        templateUrl:'team-detail.page.html'

})
export class TeamDetail{

    allGames: any[];
    dateFilter: string;
    games: any[];
    team: any;
    private tourneyData: any;
    teamStanding: any;
    useDateFilter = false;

    constructor(private nav: NavController, 
                private navParams: NavParams,
                private eliteApi: EliteApi){
    }

    ionViewDidLoad(){
        this.team = this.navParams.data;
        this.tourneyData = this.eliteApi.getCurrentTourney();

        this.games = _.chain(this.tourneyData.games)
                     .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                     .map(g => {
                         let isTeam1 = (g.team1Id === this.team.id);
                         let opponentName = isTeam1 ? g.team2 : g.team1;4
                         let scoreDisplay = this.getScoreDiaplay(isTeam1, g.team1Score, g.team2Score);
                         return {

                             gameId: g.id,
                             opponent: opponentName,
                             time: Date.parse(g.time),
                             location: g.location,
                             locationUrl: g.locationUrl,
                             scoreDisplay: scoreDisplay,
                             homeAway: (isTeam1? "Vs." : "at")
                         };
                     })
                     .value();

        this.allGames = this.games;
        this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id});
    }

    getScoreDiaplay(isTeam1, team1Score, team2Score){
        if(team1Score && team2Score){
            var teamscore = (isTeam1? team1Score:team2Score);
            var opponentScore = (isTeam1? team2Score: team1Score);
            var winIndicator = teamscore > opponentScore? "W:":"L:";
            return winIndicator + teamscore + "-" + opponentScore;
        }
        else{
            return "";
        }
    }

    gameClicked($event, game){
        let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
        this.nav.parent.parent.push(GamePage, sourceGame);
    }

    dateChanged(){
        if(this.useDateFilter){
          this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
        } else {
          this.games = this.allGames;
        }
    }
}