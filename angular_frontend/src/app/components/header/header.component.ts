import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './header.components.html',
  styles: []
})
export class HeaderComponent {
  constructor (private router:Router){}

  home(){
    this.router.navigate(['/']);
  }

  logout(){

    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.router.navigate(['/'])
  }

}
