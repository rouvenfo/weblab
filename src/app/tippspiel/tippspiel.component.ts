import { Component, OnInit } from '@angular/core';
import { Round } from '../model/round';
import { Group } from '../model/group';
import { TippspielApiService} from '../tippspiel-api.service'
import { Game } from '../model/game';
import { Standing } from '../model/standing';
import { AuthenticationServiceService } from '../authentication-service.service';
import { UserTipps } from '../model/userTipps';

@Component({
  selector: 'app-tippspiel',
  templateUrl: './tippspiel.component.html',
  styleUrls: ['./tippspiel.component.css', './tippspiel.component-mobile.css', '../flag.css']
})
export class TippspielComponent implements OnInit {

  sort_group = true;
  round_list: Round[];
  group_list: Group[];
  current_round: Round = new Round(0, "");
  current_group: Group = new Group();
  game_list: Game[];
  standing_list: Standing[];
  userTipps: UserTipps[];
  tipps_saved: boolean;
  mobileRoundsShow: boolean;
  mobileGroupsShow: boolean;

  constructor(private tippspielApiService: TippspielApiService, public authenticationService: AuthenticationServiceService) { }

  ngOnInit() {
    this.getRounds();
    if(this.authenticationService.isLogged()){
      this.tippspielApiService.getTippsUser().subscribe(value => this.userTipps = value);
    }
  }

  setSort(sort: boolean){
    this.sort_group = sort;
    this.getRounds();
  }

  getRounds(){
    if(this.sort_group){
      this.tippspielApiService.getRounds().subscribe(value => this.setFirstRound(value));
    }
    else{
      this.tippspielApiService.getRoundsRound().subscribe(value => this.setFirstRound(value));
    }
  }

  setFirstRound(value: Round[]){
    this.round_list = value;
    this.current_round = this.round_list[0];
    if(this.sort_group){
      this.getGroups();
    }
    else{
      this.getGamesRound();
    }
  }

  setRound(round: Round){
    this.current_round = round;
    this.mobileRoundsShow = false;
    if(this.sort_group){
      this.getGroups();
    }
    else{
      this.getGamesRound();
    }
  }

  getGroups(){
    this.tippspielApiService.getGroups(this.current_round.RUNDE_ID).subscribe(value => this.setFirstGroup(value));
  }

  setFirstGroup(value: Group[]){
    this.group_list = value;
    this.current_group = this.group_list[0];
    this.getGamesGroup();
    this.getTableStandings();
  }

  setGroup(group: Group){
    this.current_group = group;
    this.getGamesGroup();
    this.getTableStandings()
    this.mobileGroupsShow = false;
  }

  getGamesRound(){
    this.tippspielApiService.getGamesRound(this.current_round.RUNDE_ID).subscribe(value => this.setGamesTipps(value));
  }

  getGamesGroup(){
    this.tippspielApiService.getGamesGroup(this.current_group.GRUPPE_ID).subscribe(value => this.setGamesTipps(value));
  }

  setGamesTipps(games: Game[]){
    this.game_list = games;
    if(this.userTipps != null){
      for(let game of this.game_list){
        if(game.userTipp != null) continue;
        let currentTipp = this.userTipps.find(x => x.encounter_id == game.encounter_id);
        if(currentTipp == null){
          currentTipp = new UserTipps();
          currentTipp.encounter_id = game.encounter_id;
        }
        game.userTipp = currentTipp;
      }
    }
  }

  getTableStandings(){
    this.tippspielApiService.getTableStandings(this.current_group.GRUPPE_ID).subscribe(value => this.standing_list = value);
  }

  tor_differenz(standing: Standing): number{
    return standing.tore_plus - standing.tore_minus;
  }

  submit(){
    var list = new Array<UserTipps>();
    for(let current_game of this.game_list){
      list.push(current_game.userTipp);
    }
    this.tippspielApiService.saveTippsUser(list).subscribe(value => this.showTippsSaved());

  }

  showTippsSaved(){
    this.tippspielApiService.getTippsUser().subscribe(value => this.userTipps = value);
    this.tipps_saved = true;
    setTimeout(() => this.tipps_saved = false, 3000);
  }

  checkBoxShowRound(){
    this.mobileRoundsShow = !this.mobileRoundsShow;
  }

  checkBoxShowGroup(){
    this.mobileGroupsShow = !this.mobileGroupsShow;
  }
}
