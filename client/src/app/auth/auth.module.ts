import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ShowErrorsModule } from '../show-errors/show-errors.module';
import { LoadingModule } from '../loading/loading.module';
import { SignoutComponent } from './signout/signout.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ShowErrorsModule,
    LoadingModule
  ]
})
export class AuthModule { }
