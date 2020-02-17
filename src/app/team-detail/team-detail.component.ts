import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../model/team';
import { TippspielApiService } from '../tippspiel-api.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css', '../flag.css']
})
export class TeamDetailComponent implements OnInit {

  currentTeam: Team;
  teamName: string;

  constructor(private tippspielApiService: TippspielApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam(){
    const id = this.route.snapshot.paramMap.get('id');
    this.tippspielApiService.getTeam(id).subscribe(value => this.currentTeam = value[0]);
  }
}
