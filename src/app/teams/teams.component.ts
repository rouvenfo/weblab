import { Component, OnInit } from '@angular/core';
import { TippspielApiService } from '../tippspiel-api.service';
import { Team } from '../model/team';
import { TeamGroup } from '../model/team_group';
import { Group } from '../model/group';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css', '../flag.css']
})
export class TeamsComponent implements OnInit {

  team_map: Map<string, Team[]> = new Map<string, Team[]>();

  constructor(private tippspielApiService: TippspielApiService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(){
    this.tippspielApiService.getTeams().subscribe(value => this.mapTeamsGroup(value));
  }

  mapTeamsGroup(team_group_list: TeamGroup[]){
    for(let current of team_group_list){
      if(this.team_map.get(current.group.BEZ) == null){
        this.team_map.set(current.group.BEZ, new Array<Team>());
      }
      this.team_map.get(current.group.BEZ).push(current.team);
    }
  }
}
