import { Component, OnInit } from '@angular/core';
import { TippspielApiService } from '../tippspiel-api.service';
import { TippGroup } from '../model/tippGroup';
import { Invitations } from '../model/invitation';
import { Ranking } from '../model/ranking';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Group } from '../model/group';

@Component({
  selector: 'app-rangliste',
  templateUrl: './rangliste.component.html',
  styleUrls: ['./rangliste.component.css']
})
export class RanglisteComponent implements OnInit {

  myGroup: TippGroup;
  invitations: Array<Invitations> = new Array<Invitations>();
  ranking: Array<Ranking>;
  showMyGroupRanking: boolean = true;
  addUser: boolean;
  deleteGroup: boolean;
  added_user: boolean;
  username_invite: string;
  newGroup: boolean;
  showInvitations: boolean;
  group_name: string;
  group_name_vergeben: boolean;

  constructor(private tippspielApiService: TippspielApiService, public authenticationService: AuthenticationServiceService) { }

  ngOnInit() {
    this.myGroup = new TippGroup();
    this.tippspielApiService.getMyTippGroup().subscribe(value => this.setMyGroup(value));
    this.tippspielApiService.getInvitations().subscribe(value => this.setInvitations(value));
  }

  setMyGroup(tippGroup: TippGroup){    
    this.myGroup = tippGroup;
    this.group_name_vergeben = false;

    if(this.newGroup && this.myGroup == null){
      this.group_name_vergeben = true;
    }

    if(this.myGroup != null){
      this.newGroup = false;
      if(this.showMyGroupRanking){
        this.tippspielApiService.getGroupRanking().subscribe(value => this.setGroupRanking(value));
      }
      else{
        this.tippspielApiService.getTop10().subscribe(value => this.setGroupRanking(value));
      }
    }
    else if(!this.authenticationService.isLogged()){
      this.showMyGroupRanking = false;
      this.tippspielApiService.getTop10().subscribe(value => this.setGroupRanking(value));
    }
  }

  setInvitations(invitations: Array<Invitations>){
    this.invitations = invitations;
    if(this.invitations == null){
      this.invitations = new Array<Invitations>();
    }
  }

  setGroupRanking(ranking: Array<Ranking>){
    this.ranking = ranking;
  }

  setShowRankingGroup(showMyGroupRanking: boolean){
    this.showMyGroupRanking = showMyGroupRanking;
    if(this.showMyGroupRanking){
      this.tippspielApiService.getGroupRanking().subscribe(value => this.setGroupRanking(value));
    }
    else{
      this.tippspielApiService.getTop10().subscribe(value => this.setGroupRanking(value));
    }
  }

  showAddUser(){
    this.addUser = true;
    this.added_user = false;
    this.username_invite = "";
  }

  showDeleteGroup(){
    this.deleteGroup = true;
  }

  back(){
    this.addUser = false;
    this.deleteGroup = false;
    this.newGroup = false;
    this.showInvitations = false;
  }

  inviteUser(){
    this.added_user = true;
    this.tippspielApiService.inviteUser(this.username_invite).subscribe();
  }

  yesDeleteGroup(){
    this.deleteGroup = false;
    if(this.myGroup.is_admin){
      this.tippspielApiService.deleteGroup().subscribe();
    }
    else{
      this.tippspielApiService.deleteUser().subscribe();
    }
    this.setShowRankingGroup(false);
    this.myGroup = null;
  }

  showNewGroup(){
    this.newGroup = true;
  }

  showAllInvitations(){
    this.showInvitations = true;
  }

  createGroup(){
    this.tippspielApiService.createNewGroup(this.group_name).subscribe(value => this.setMyGroup(value));
  }

  acceptInvitations(groupId: number){
    this.showInvitations = false;
    this.tippspielApiService.acceptInvitation(groupId).subscribe(value => this.setMyGroup(value));
  }
}
