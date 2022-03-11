import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  ngOnInit(): void {
  }

}
