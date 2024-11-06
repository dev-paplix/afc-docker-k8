import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-usr',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './edit-user.component.html',
  styles: ``
})
export class EditUsrComponent implements OnInit {

  userId!: number;
  user: {
    name: string;
    email: string;
    status: string;
    role: string;
    contactNumber: string;
  } = {
    name: '',
    email: '',
    status: '',
    role: '',
    contactNumber: ''
  }

  constructor( private router: Router, private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit(): void {

      this.userId = Number(this.route.snapshot.paramMap.get('id'));
      this.fetchUser();
  }

  fetchUser(): void{
    this.http.get<{
      name: string;
      email: string;
      role: string;
      status: string;
      contactNumber: string;

    }>(`http://localhost:3100/user/${this.userId}`)
      .subscribe( user => {
        this.user = user;
      },
        error => {
          console.error('Error fetching user', error);
        }
    )
  }

  saveChanges(): void{
    this.http.patch(`http://localhost:3100/user/${this.userId}`, this.user)
      .subscribe(
        ()=> {
          complete:this.router.navigate(['/admin-dashboard']);
        },
        error => {
          complete:console.error('Error editing user', error);
        }
      );

  }

}
