import { Team } from './team';
import { UserTipps } from './userTipps';

export class Game{
    encounter_id: number;
    goals_team_first: number;
    goals_team_second: number;
    date: string;
    team_home: Team;
    team_away: Team;
    date_day: string;
    date_time: string;
    userTipp: UserTipps;
}