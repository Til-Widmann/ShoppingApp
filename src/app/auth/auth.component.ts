import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  inLoginMode = true;
  form: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.min(6)]),
      'password': new FormControl(null, Validators.required)
    })
  }
  onSwitchMode(){
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(){
    this.isLoading = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (this.inLoginMode){
      authObs =this.authService.login(email, password)
    }else{
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/recipes'])
      },errorResponse => {
        this.error = errorResponse.error.error.message;
        console.log(errorResponse);
      }
    )
    this.form.reset()
    this.isLoading = false;
  }
}
