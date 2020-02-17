import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Round } from './model/round';
import { Group } from './model/group';
import { Game } from './model/game';
import { Team } from './model/team';
import { TeamGroup } from './model/team_group';
import { Standing } from './model/standing';
import { LoginObject } from './login/loginObject';
import { TippGroup } from './model/tippGroup';
import { Invitations } from './model/invitation';
import { Ranking } from './model/ranking';
import { UserTipps } from './model/userTipps';

@Injectable({
  providedIn: 'root'
})
export class TippspielApiService {

  private apiUrl = 'https://www.2020emtippspiel.ch/api/';  // URL to web api

  constructor(private http: HttpClient) { }

  getRounds(): Observable<Round[]> {
    const url = this.apiUrl + 'Rounds';
    return this.http.get<Round[]>(url).pipe(tap(), catchError(this.handleError<Round[]>('Rounds', [])));
  }

  getRoundsRound(): Observable<Round[]> {
    const url = this.apiUrl + 'RoundsRound';
    return this.http.get<Round[]>(url).pipe(tap(), catchError(this.handleError<Round[]>('RoundsRound', [])));
  }

  getGroups(roundId: number): Observable<Group[]> {
    const url = this.apiUrl + 'Groups/' + roundId;
    return this.http.get<Group[]>(url).pipe(tap(), catchError(this.handleError<Group[]>('Groups', [])));
  }

  getGamesRound(roundId: number): Observable<Game[]>{
    const url = this.apiUrl + 'GamesRound/' + roundId;
    return this.http.get<Game[]>(url).pipe(tap(), catchError(this.handleError<Game[]>('GamesRound', [])));
  }

  getGamesGroup(groupId: number): Observable<Game[]>{
    const url = this.apiUrl + 'GamesGroup/' + groupId;
    return this.http.get<Game[]>(url).pipe(tap(), catchError(this.handleError<Game[]>('GamesGroup', [])));
  }

  getTableStandings(groupId: number): Observable<Standing[]>{
    const url = this.apiUrl + 'Standings/' + groupId;
    return this.http.get<Standing[]>(url).pipe(tap(), catchError(this.handleError<Standing[]>('Standings', [])));
  }

  getTeams(): Observable<TeamGroup[]>{
    const url = this.apiUrl + 'Teams';
    return this.http.get<TeamGroup[]>(url).pipe(tap(), catchError(this.handleError<TeamGroup[]>('Teams', [])));
  }
  
  getTeam(id: string): Observable<Team>{
    const url = this.apiUrl + 'Team/' + id;
    return this.http.get<Team>(url).pipe(tap(), catchError(this.handleError<Team>('Team/' + id, )));
  }

  getTippsUser(): Observable<UserTipps[]>{
    const url = this.apiUrl + 'TippsUser';
    return this.http.get<UserTipps[]>(url).pipe(tap(), catchError(this.handleError<UserTipps[]>('TippsUser', [])));
  }

  saveTippsUser(userTipps: UserTipps[]): Observable<boolean>{
    const url = this.apiUrl + 'TippsUser';
    let body = new FormData();
    body.append("user_tipps", JSON.stringify(userTipps));
    return this.http.post<boolean>(url, body).pipe(tap(), catchError(this.handleError<boolean>('TippsUser', )));
  }

  register(username: string, password: string, token): Observable<any>{
    const url = this.apiUrl + 'Register';
    let body = new FormData();
    body.append("username", username);
    body.append("password", password);
    body.append("token", token);
    return this.http.post<any>(url, body).pipe(tap(), catchError(this.handleError<any>('Register', )));
  }

  checkUsername(username: string): Observable<boolean>{
    const url = this.apiUrl + 'CheckUsername/' + username;
    return this.http.get<boolean>(url).pipe(tap(), catchError(this.handleError<boolean>('CheckUsername', )));
  }

  checkLogin(username: string, password: string): Observable<LoginObject>{
    const url = this.apiUrl + 'Login';
    let body = new FormData();
    body.append("username", username);
    body.append("password", password);
    return this.http.post<LoginObject>(url, body).pipe(tap(), catchError(this.handleError<LoginObject>('Login', )));
  }

  getMyTippGroup(): Observable<TippGroup>{
    const url = this.apiUrl + 'MyGroup';
    return this.http.get<TippGroup>(url).pipe(tap(), catchError(this.handleError<TippGroup>('MyGroup', )));
  }

  getInvitations(): Observable<Invitations[]>{
    const url = this.apiUrl + 'Invitations';
    return this.http.get<Invitations[]>(url).pipe(tap(), catchError(this.handleError<Invitations[]>('Invitations', [])));
  }

  getGroupRanking(): Observable<Ranking[]>{
    const url = this.apiUrl + 'Ranking';
    return this.http.get<Ranking[]>(url).pipe(tap(), catchError(this.handleError<Ranking[]>('Ranking', [])));
  }

  getTop10(): Observable<Ranking[]>{
    const url = this.apiUrl + 'Top10';
    return this.http.get<Ranking[]>(url).pipe(tap(), catchError(this.handleError<Ranking[]>('Top10', [])));
  }

  inviteUser(username: string): Observable<any>{
    const url = this.apiUrl + 'Invite';
    let body = new FormData();
    body.append("username", username);
    return this.http.post<any>(url, body).pipe(tap(), catchError(this.handleError<any>('Invite', )));
  }

  deleteGroup(): Observable<any>{
    const url = this.apiUrl + 'Group';
    return this.http.delete<any>(url).pipe(tap(), catchError(this.handleError<any>('Invite', )));
  }

  deleteUser(): Observable<any>{
    const url = this.apiUrl + 'UserGroup';
    return this.http.delete<any>(url).pipe(tap(), catchError(this.handleError<any>('UserGroup', )));
  }

  createNewGroup(groupname: string): Observable<TippGroup>{
    const url = this.apiUrl + 'Group';
    let body = new FormData();
    body.append("group_name", groupname);
    return this.http.post<TippGroup>(url, body).pipe(tap(), catchError(this.handleError<TippGroup>('Group', )));
  }

  acceptInvitation(groupId: number): Observable<TippGroup>{
    const url = this.apiUrl + 'AcceptInvitation';
    let body = new FormData();
    body.append("group_id", groupId.toString());
    return this.http.post<TippGroup>(url, body).pipe(tap(), catchError(this.handleError<TippGroup>('Group', )));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
