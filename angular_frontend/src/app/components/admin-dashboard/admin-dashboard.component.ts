import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { MatButtonModule } from '@angular/material/button'; 

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  contactNumber: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    MatButtonModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'role', 'status', 'delete', 'edit'];
  dataSource: User[] = [];
  

  constructor(private router: Router, private http: HttpClient, public snackBar: MatSnackBar) {}

  editUser(id: number): void {
    this.router.navigate([`/edit-user/${id}`]);
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('http://localhost:3100/user')
      .subscribe(users => {
        this.dataSource = users;
      });
  }

  deletUser(id: number, message: string, action: string): void {
    this.http.delete(`http://localhost:3100/user/${id}`)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(user => user.id !== id);
      });
    this.snackBar.open(message, action, {
      duration: 9000,
    });
  }
}
