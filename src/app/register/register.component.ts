import { Component, OnInit } from '@angular/core';
import { RegisterForm } from './registerForm';
import { TippspielApiService } from '../tippspiel-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formModel: RegisterForm = new RegisterForm();
  submitted = false;
  test: string;
  error: string = "";
  is_error: boolean;

  constructor(private tippspielApiService: TippspielApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() { 
    if(this.formModel.username_not_taken){
      if(this.formModel.password == this.formModel.passwordConfirm){
        this.submitted = true;
        this.tippspielApiService.register(this.formModel.username, this.formModel.password, this.formModel.captcha).subscribe(data  => { this.registerEnd(data) }, err => { console.log(err) }, () => {});
      }
      else{
        this.is_error = true;
        this.error = "Passwörter stimmen nicht überein!";
      }
    }
    else{
      this.is_error = true;
      this.error = "Benutzername ist bereits vergeben!";
    }
   }

   registerEnd(data: any){
    if(data.success){
      this.router.navigate(['/register-success']);
    }
    else{
      console.log(data.error);
    }
   }

   checkUsername(){
    this.tippspielApiService.checkUsername(this.formModel.username).subscribe(value => this.checkUsernameAnswer(value));
  }

  checkUsernameAnswer(is_not_taken: boolean){
      this.formModel.username_not_taken = is_not_taken;
  }
}
