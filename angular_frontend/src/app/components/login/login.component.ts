import { Component, signal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {merge, subscribeOn} from 'rxjs';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,

  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.loginForm = this.fb.group({
      email: ['' ,[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.http.post('http://localhost:3100/auth/login', this.loginForm.value)
        .subscribe((response: any)=>{
          const { access_token, role } = response;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('role', role);

          if(role === 'admin'){
            this.router.navigate(['admin-dashboard']);
          } else if (role === 'user'){
            this.router.navigate(['user-dashboard']);
          }
        }, (error) =>{
          console.error('Login Failed', error);
        });   
    }
  }


}
