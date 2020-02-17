import { RecaptchaFormsModule, RecaptchaComponent } from 'ng-recaptcha';

export class RegisterForm{
    captcha: RecaptchaComponent;
    username: string;
    password: string;
    passwordConfirm: string;
    username_not_taken: boolean = true;
}