import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TippspielComponent } from './tippspiel/tippspiel.component';
import { RanglisteComponent } from './rangliste/rangliste.component';
import { TeamsComponent } from './teams/teams.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/tippspiel', pathMatch: 'full' },
  {path: 'tippspiel', component: TippspielComponent},
  {path: 'rangliste', component: RanglisteComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'team/:id', component: TeamDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
