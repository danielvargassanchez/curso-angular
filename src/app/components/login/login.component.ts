import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const email = this.form.get("email")?.value;
    const password = this.form.get("password")?.value;

    const data: LoginRequest = new LoginRequest();
    data.email = email;
    data.password = password;

    this.loginService.login(data).subscribe(response => {
      if (response.token) {
        this.router.navigate(['home']);
      }
    },
      (error) => {
        alert(error.error.error);
      });

  }

}
