import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/refresh.service';
import { TokenService } from 'src/app/token.service';
import { UserLogin } from '../../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  user?: UserLogin
  errors: String[] | string = ''

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private refleshService: RefreshService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  verifyValidRequired(property: string) {
    return (this.loginFormControl[property].touched || this.submitted) && this.loginFormControl[property].errors?.['required']
  }

  verifyValidEmail() {
    return this.loginFormControl['email'].touched && this.loginFormControl['email'].dirty && this.loginFormControl['email'].errors?.['email']
  }

  verifyValidPassword() {
    return this.loginFormControl['password'].touched && this.loginFormControl['password'].dirty && this.loginFormControl['password'].errors?.['minlength']
  }


  onSubmit() {

    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;

      this.user = {
        email: this.loginFormControl['email'].value,
        password: this.loginFormControl['password'].value
      }

      this.authService.signin(this.user.email, this.user.password)
        .subscribe({
          next: (res) => {
            this.tokenService.setUserInfo(res)
            this.loading = false;
            this.errors = ''
            this.refleshService.sendUpdate(true);
            this.router.navigate(['/heroes/my'])
          },
          error: (e) => {
            console.log(e)
            this.loading = false;
            this.errors = e.error.message || 'Algo deu errado, tente novamente mais tarde'
          }
        });
    }
  }

}
