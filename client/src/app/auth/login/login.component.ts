import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6),Validators.required]]
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
    console.log(this.loginFormControl['password'].errors?.['minlength'])
    return this.loginFormControl['password'].touched && this.loginFormControl['password'].dirty && this.loginFormControl['password'].errors?.['minlength']
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      alert('Login efetuado com sucesso!')
    }
  }

}
