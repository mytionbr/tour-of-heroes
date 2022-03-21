import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefreshService } from 'src/app/refresh.service';
import { TokenService } from 'src/app/token.service';
import { User, UserLogin } from '../../user';
import { AuthService } from '../auth.service';
import { SignupValidationService } from './signup-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  user?: User;
  errors: String[] | string = '';

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private signupValidationService: SignupValidationService,
    private tokenService: TokenService,
    private refleshService: RefreshService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required, this.signupValidationService.passwordPatternValidator()])],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.signupValidationService.MatchPassword('password', 'confirmPassword')
      }
    )
  }

  ngOnInit(): void {
  }

  get registerFormControl(){
    return this.registerForm.controls;
  }

  verifyValidRequired(property: string) {
    return (this.registerFormControl[property].touched || this.submitted) && this.registerFormControl[property].errors?.['required']
  }

  verifyValidEmail() {
    return this.registerFormControl['email'].touched && this.registerFormControl['email'].dirty && this.registerFormControl['email'].errors?.['email']
  }

  verifyValidPassword() {
    return this.registerFormControl['password'].touched && this.registerFormControl['password'].dirty && this.registerFormControl['password'].errors?.['invalidPassword']
  }

  verifyValidConfirmPassword() {
    return this.registerFormControl['confirmPassword'].touched && this.registerFormControl['confirmPassword'].dirty && this.registerFormControl['confirmPassword'].errors?.['passwordMismatch']
  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;

      this.user = {
        username: this.registerFormControl['username'].value,
        email: this.registerFormControl['email'].value,
        password: this.registerFormControl['password'].value
      }

      this.authService.signup(this.user)
        .subscribe({
          next: (res)=>{
            console.log(res)
            this.tokenService.setUserInfo(res);
            this.loading = false;
            this.errors = ''
            this.refleshService.sendUpdate(true);
          },
          error: (e)=>{
            console.log(e)
            this.loading = false;
            this.errors = e.error.message || 'Algo deu errado, tente novamente mais tarde'
          }
        })
    }
  }

}
